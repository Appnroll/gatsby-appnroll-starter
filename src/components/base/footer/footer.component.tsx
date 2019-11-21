import React from "react"
import AppnrollLogo from "../../../images/appnroll.svg"
import FunctionComponent from "../../../types/function-component.interface"

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
