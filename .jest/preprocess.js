const babelOptions = {
  // Required by Gatsby.
  presets: ["babel-preset-gatsby"],
  // Required by Storyshots.
  plugins: ["require-context-hook"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
