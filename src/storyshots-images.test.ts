/**
 * This file initializes the StoryShots images functionality.
 * Read more: https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer
 */

import initStoryshots from "@storybook/addon-storyshots"
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer"
import { resolve } from "path"

// Screenshot time seems to be a bit random creating false negatives. Hence delay.
const beforeScreenshot = (): Promise<void> => {
  return new Promise((resolvePromise) =>
    setTimeout(() => {
      resolvePromise()
    }, 600)
  )
}

initStoryshots({
  suite: "Image storyshots",
  test: imageSnapshot({
    storybookUrl: "file://" + resolve(__dirname, "..", "storybook-static"),
    beforeScreenshot,
  }),
})
