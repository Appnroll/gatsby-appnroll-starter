import { configure, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import GlobalStyle from "../src/components/global-style.component"
import { Normalize } from "styled-normalize"
import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../src/theming/theme"

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

addDecorator(story => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Normalize />
        {story()}
      </>
    </ThemeProvider>
  )
})

configure(loadStories, module)
