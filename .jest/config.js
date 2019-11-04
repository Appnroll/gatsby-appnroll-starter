const base = require("./config-base")

module.exports = {
  ...base,
  testPathIgnorePatterns: [
    ...base.testPathIgnorePatterns,
    "storyshots-images.test.ts",
  ],
}
