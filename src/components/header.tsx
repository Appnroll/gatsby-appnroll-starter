import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Theme } from "../theme";

const HeaderRoot = styled.header`
  background: ${({ theme }: { theme: Theme }) => theme.color.background};
  margin-bottom: 1.45rem;
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ siteTitle = `` }: { siteTitle: string }) => (
  <HeaderRoot>
    <ContentWrapper>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
    </ContentWrapper>
  </HeaderRoot>
)

export default Header
