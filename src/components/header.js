import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const HeaderRoot = styled.header`
  background: ${({theme}) => theme.color.background};
  margin-bottom: 1.45rem;
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ siteTitle }) => (
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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
