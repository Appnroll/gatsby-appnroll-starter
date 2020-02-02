import React from "react"
import AppnrollLogo from "../../../images/appnroll.svg"
import FunctionComponent from "../../../types/function-component.interface"

interface Props {
  currentYear?: string
}

const Footer: FunctionComponent<Props> = ({
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
