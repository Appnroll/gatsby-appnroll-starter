import React from "react"
import AppnrollLogo from "../../../images/appnroll.svg"
import AppFunctionComponent from "../../../types/app-function-component.interface"

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
