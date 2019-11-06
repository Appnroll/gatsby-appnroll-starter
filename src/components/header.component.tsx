import React from "react"
import styled from "styled-components"
import { Theme } from "../theme"

const HeaderRoot = styled.header`
  background: ${({ theme }: { theme: Theme }) => theme.color.background};
  margin-bottom: 1.45rem;
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const prettier = {
  18: true,
  19: undefined
}
const bajery = prettier?.['19'] ?? "no"


console.log(bajery)
const Header = ({ siteTitle = `` }: { siteTitle?: string }) => {
  return (
    <HeaderRoot>
      <ContentWrapper>
        <h1>{siteTitle}</h1>
      </ContentWrapper>
    </HeaderRoot>
  )
}

export default Header
