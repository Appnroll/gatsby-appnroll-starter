import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Content = styled.div`
  max-width: 300px;
  marginBottom: 1.45rem;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello from App'n'roll</h1>
    <Content>
      <Image />
    </Content>
  </Layout>
)

export default IndexPage
