/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React, { ReactChild } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import theme from "../theming/theme"
import Header from "./base/header/header.component"

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <Header siteTitle={data.site.siteMetadata.title} />
        <ContentWrapper>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Made by
            {` `}
            <a href="https://www.appnroll.com/">App'n'roll</a>
          </footer>
        </ContentWrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout
