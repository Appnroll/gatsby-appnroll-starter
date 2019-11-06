#!/usr/bin/env node

/*
 * General configuration
 */
const config = {
  waiting: {
    interval: 0.5, // 0.5s
    timeout: 10, // 10s
  },
  output: {
    reportDirectory: "./lighthouse-reports",
    reportPrefix: "report-",
  },
}

/*
 * Imports
 */
const waitUntil = require("wait-until")
const validUrl = require("valid-url")
const axios = require("axios")
const path = require("path")
const lighthouse = require("lighthouse")
const puppeteer = require("puppeteer")
const request = require("request")
const cookie = require("cookie")
const util = require("util")
const chromeLauncher = require("chrome-launcher")
const url = require("url")
const _ = require("lodash")
const table = require("table")
const colors = require("colors")
const fs = require("fs-extra")
const filenamify = require("filenamify")
const log = require("lighthouse-logger")

/*
 * Input processing
 */

// load our manifest
let manifest
try {
  manifest = require(path.join("..", process.argv[2]))
} catch (err) {
  throw new Error("Please pass in a valid manifest path.")
}

// ensure that URL is well formed
const baseUrl = process.argv[3]
if (!validUrl.isWebUri(baseUrl)) {
  throw new Error("Please pass in a valid URL.")
}

// ensure that the test-group exists in the manifest
const testGroup = manifest[process.argv[4]]
if (!testGroup) {
  throw new Error(
    "Please pass in a valid test group, that exists in your manifest."
  )
}

// parse lighthouse headers
let headers = {}
try {
  headers = JSON.parse(process.argv[5])
} catch (err) {
  //noop
}
headers["Accept-Language"] = "en" // otherwise will spam console.logs with 404 and locale not found from API if your browser has its primary lang as non-en
headers["accept-language"] = "en" // otherwise will spam console.logs with 404 and locale not found from API if your browser has its primary lang as non-en

/*
 * Main
 */
;(async () => {
  // cleanup
  const outputPathDir = path.resolve(config.output.reportDirectory)
  try {
    await fs.remove(outputPathDir)
  } catch (err) {
    throw new Error(
      `Could not remove directory on disk at path ${outputPathDir}`
    )
  }
  try {
    await fs.mkdirp(outputPathDir)
  } catch (err) {
    throw new Error(
      `Could not create output directory on disk at path ${outputPathDir}`
    )
  }

  // wait until the site becomes accessible, before starting to run our tests
  console.log(`Waiting for ${baseUrl} to become accessible...`)
  const baseUrlAccessible = await new Promise(resolve => {
    waitUntil(
      config.waiting.interval * 1000,
      Math.round(config.waiting.timeout / config.waiting.interval),
      callback => {
        axios
          .get(baseUrl, { headers })
          .then(response => {
            callback(response.status === 200)
          })
          .catch(() => {
            callback(false)
          })
      },
      result => {
        resolve(Boolean(result))
      }
    )
  })

  if (!baseUrlAccessible) {
    console.log(`${baseUrl} did not become accessible on time.`)
    process.exit(1)
  }

  console.log(`${baseUrl} is now accessible. Starting tests...`)

  // launch chrome
  // console.log(`Launching Chrome...`)
  const chromeOptions = {
    chromeFlags: ["--headless", "--lang=en"],
  }
  const chrome = await chromeLauncher.launch({ chromeOptions })

  // connect to Puppeteer with Chrome
  const resp = await util.promisify(request)(
    `http://localhost:${chrome.port}/json/version`
  )
  const { webSocketDebuggerUrl } = JSON.parse(resp.body)
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  })

  // set cookies in Chrome
  const parsedBaseUrl = url.parse(baseUrl)
  const page = await browser.newPage()
  if (headers.Cookie) {
    // prepare the cookie prototype for our domain
    const cookiePrototype = {
      name: undefined,
      value: undefined,
      domain: "." + parsedBaseUrl.hostname,
      path: "/",
      httpOnly: false,
      secure: false,
    }

    // get the plain cookies
    const plainCookies = cookie.parse(headers.Cookie)
    delete headers.Cookie

    // create full cookie objects
    let cookieJar = []
    for (const [key, value] of Object.entries(plainCookies)) {
      let concreteCookie = cookiePrototype
      concreteCookie.name = key
      concreteCookie.value = value

      cookieJar.push(concreteCookie)
    }

    // set our cookies on the page
    await page.setCookie(...cookieJar)
  }

  // loop through the manifest, performing lighthouse tests
  let overallPass = 1 // we will &= each audit against this, as a way of knowing if everying passed
  let testResults = {} // we want to print the aggregate tests results at the end of everything, so we'll store the aggregate test results in here
  for (let test of testGroup) {
    const targetUrl = url.resolve(baseUrl, test.path)
    const lighthouseConfig = test.config

    // lighthouse options
    const lighthouseOptions = {
      port: chrome.port,
      logLevel: "error", // https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-logger/index.js#L79
      output: "html",
      extraHeaders: headers,
      disableStorageReset: true,
    }

    // set logging
    log.setLevel(lighthouseOptions.logLevel)

    // run actual lighthouse test
    // console.log(`[${targetUrl}] Running Lighthouse audit...`)
    const lhResults = await lighthouse(
      targetUrl,
      lighthouseOptions,
      lighthouseConfig
    )
    const lhJson = lhResults.lhr

    // store the report to disk
    const sanitizedFilename = filenamify(targetUrl, { replacement: "_" })
    const outputPath = path.resolve(
      config.output.reportDirectory,
      `${config.output.reportPrefix}${sanitizedFilename}.html`
    )
    try {
      await fs.writeFileSync(outputPath, lhResults.report)
    } catch (err) {
      throw new Error(`Could not write report to disk at path ${outputPath}`)
    }

    // process our results
    // console.log(`[${targetUrl}] Processing output...`)

    // go through all the test and print to console
    for (const [auditId, audit] of Object.entries(lhJson.audits)) {
      if (audit.score == 0) {
        console.log(
          `[${targetUrl}] ❌ [${auditId}] ${audit.title} - ${audit.description}\n`
        )
      }
    }

    // compare the thresholds
    testResults[targetUrl] = []
    for (const [category, minScore] of Object.entries(test.thresholds)) {
      if (!lhJson.categories[category]) {
        continue
      }
      const score = lhJson.categories[category].score
      const pass = score >= minScore

      // combine this with the overall score. if any of our pass scores turns out false, then overallPass will end up false
      overallPass &= pass

      // record the result
      testResults[targetUrl].push({
        pass,
        category,
        score,
        minScore,
      })
    }
  }

  // kill chrome
  console.log(`Killing Chrome...`)
  await chrome.kill()

  // print aggregate results
  console.log("===============================\n")

  for (const [targetUrl, categoryResults] of Object.entries(testResults)) {
    const tableData = []
    tableData.push(["", "Audit".bold, targetUrl.bold])

    for (const categoryResult of categoryResults) {
      const symbol = _(categoryResult.pass).thru(pass => {
        if (pass) {
          return " PASS ".bgGreen.black.bold
        } else {
          return " FAIL ".bgRed.white.bold
        }
      })
      tableData.push([
        symbol,
        categoryResult.category,
        `Score: ${categoryResult.score} (Threshold >= ${categoryResult.minScore})`,
      ])
    }

    console.log(table.table(tableData))
  }

  // ultimately return an exit code. 0 if all pass, 1 otherwise
  process.exit(
    _(overallPass).thru(overallPass => {
      if (overallPass == 1) {
        return 0
      } else {
        return 1
      }
    })
  )
})()

// crash the process if we get any unhandled exceptions
process.on("unhandledRejection", up => {
  throw up
})
