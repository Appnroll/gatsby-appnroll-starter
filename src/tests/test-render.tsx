import {
  Queries,
  render as reactRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../theming/theme"

export * from "@testing-library/react"

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function render<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult<Q>
export function render<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, "queries">
) {
  return reactRender<Q>(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>,
    // @ts-ignore
    options
  )
}
