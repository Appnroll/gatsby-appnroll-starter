import { graphql } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AppFunctionComponent from "../types/app-function-component.interface"

const Content = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`

interface Props {
  readonly data: {
    readonly placeholderImage: {
      readonly childImageSharp: {
        readonly fluid: FluidObject
      }
    }
  }
}

const IndexPage: AppFunctionComponent<Props> = ({
  data: {
    placeholderImage: {
      childImageSharp: { fluid },
    },
  },
}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello from App'n'roll</h1>
    <Content>
      <Image fluid={fluid} />
    </Content>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "appnroll.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
