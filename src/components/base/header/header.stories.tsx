import { storiesOf } from "@storybook/react"
import * as React from "react"
import HeaderComponent from "./header.component"

const storyStyles = {
  padding: "30px",
  maxHeight: "70vh",
  maxWidth: "70vw",
  boxShadow:
    "rgba(102, 119, 136, 0.03) 0px 6px 8px, rgba(102, 119, 136, 0.3) 0px 1px 2px",
  overflow: "auto",
}

const Container = (storyFn: () => React.ReactNode) => (
  <div style={storyStyles}>{storyFn()}</div>
)

storiesOf("Base|Header", module)
  .addDecorator(Container)
  .add("headers", () => <HeaderComponent siteTitle="Title" />)
