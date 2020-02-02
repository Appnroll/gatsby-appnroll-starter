import React from "react"
import styled from "styled-components"
import { backgroundColor } from "../../../theming/theme-getters"
import AppFunctionComponent from "../../../types/app-function-component.interface"

const HeaderRoot = styled.header`
  background: ${backgroundColor("primary")};
  margin-bottom: 1.45rem;
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

interface Props {
  siteTitle: string
}

const Header: AppFunctionComponent<Props> = ({ siteTitle }) => {
  return (
    <HeaderRoot>
      <ContentWrapper>
        <h1>{siteTitle}</h1>
      </ContentWrapper>
    </HeaderRoot>
  )
}

export default Header
