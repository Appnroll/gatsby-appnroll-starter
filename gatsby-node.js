/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fs = require("fs")
const ignorePages = ["/404/"]

exports.onPostBuild = async function onPostBuild({ cache, store, graphql }) {
  const { data } = await graphql(allPages)
  const pagesToCheck = data.allSitePage.nodes
    .map(e => e.path)
    .filter(url => !url.match(/\/dev-/) && !ignorePages.includes(url))
  fs.writeFileSync("./lighthouse-pages.json", JSON.stringify(pagesToCheck))
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve("@babel/plugin-proposal-optional-chaining"),
  })
  actions.setBabelPlugin({
    name: require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
  })
}

const allPages = `
  query allSites {
    allSitePage {
      nodes {
        path
      }
    }
  }
`
