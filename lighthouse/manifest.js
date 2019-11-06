// This file contains a manifest detailing which tests lighthouse should perform
const pages = require("../lighthouse-pages.json")

const defaultThresholds = {
  performance: 1.0,
  pwa: 0.0,
  accessibility: 1.0,
  "best-practices": 1.0,
  seo: 1.0,
}

const localAuditsToSkip = ["is-on-https", "uses-http2", "robots-txt"]
const publicAuditsToSkip = []
const publicConfig = {
  extends: "lighthouse:default",
  settings: {
    skipAudits: publicAuditsToSkip,
    onlyCategories: ["accessibility", "best-practices", "seo"],
  },
}
const localConfig = {
  extends: "lighthouse:default",
  settings: {
    skipAudits: localAuditsToSkip,
    onlyCategories: ["accessibility", "best-practices", "seo"],
  },
}

const singleRunPaths = ["/"]
const allPaths = pages

const pathsThresholdsOverride = {
  "/": {},
}

const getSpecificThreshold = path => {
  return pathsThresholdsOverride[path] || {}
}

module.exports = {
  single: singleRunPaths.map(path => ({
    path,
    thresholds: { ...defaultThresholds, ...getSpecificThreshold(path) },
    config: localConfig,
  })),
  local: allPaths.map(path => ({
    path,
    thresholds: { ...defaultThresholds, ...getSpecificThreshold(path) },
    config: { ...localConfig },
  })),
  public: allPaths.map(path => ({
    path,
    thresholds: { ...defaultThresholds, ...getSpecificThreshold(path) },
    config: { ...publicConfig },
  })),
}
