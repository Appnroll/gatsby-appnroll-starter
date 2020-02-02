import { storiesOf } from "@storybook/react"
import * as React from "react"
import Footer from "./footer.component"

storiesOf("Base|Footer", module).add("headers", () => (
  <Footer currentYear="2077" />
))
