import AppFunctionComponent from "@appnroll/app-function-component"
import React from "react"
import AppnrollLogo from "../../../images/appnroll.svg"

interface Props {
  currentYear?: string
}

const Footer: AppFunctionComponent<Props> = ({
  currentYear = new Date().getFullYear(),
}) => {
  return (
    <footer>
      © {currentYear}, Made by
      {` `}
      <a href="https://www.appnroll.com/" title="App'n'roll">
        <AppnrollLogo />
      </a>
    </footer>
  )
}

export default Footer
