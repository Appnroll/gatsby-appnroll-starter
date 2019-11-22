import { FunctionComponent } from "@appnroll/redacted"
import React from "react"
import AppnrollLogo from "../../../images/appnroll.svg"

const Footer: FunctionComponent = () => {
  return (
    <footer>
      © {new Date().getFullYear()}, Made by
      {` `}
      <a href="https://www.appnroll.com/" title="App'n'roll">
        <AppnrollLogo />
      </a>
    </footer>
  )
}

export default Footer
