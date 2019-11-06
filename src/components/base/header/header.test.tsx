import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { render } from "../../../tests/test-render"
import Header from "./header.component"

test("test", () => {
  const { getByText } = render(<Header siteTitle={"appnroll"} />)
  expect(getByText("appnroll")).toBeInTheDocument()
})
