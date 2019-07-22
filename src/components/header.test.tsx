import { render } from "@testing-library/react"
import { shallow } from "enzyme"
import React from "react"
import styled from "styled-components"
import Header from "./header"

interface Props {
  text: string
}

const Paragraph = styled.p`
  color: red;
`

const TestHeader: React.FC<Props> = ({ text }) => (
  <div data-testid="hello">
    <Paragraph>{text}</Paragraph>
  </div>
)

describe(`Header`, () => {
  it(`renders Header`, () => {
    const { getByTestId } = render(<TestHeader text="Hello, World!" />)
    expect(getByTestId("hello").textContent).toBe("Hello, World!")
  })
})

describe(`Header`, () => {
  it(`renders Header`, () => {
    const data = {
      site: {
        siteMetadata: {
          title: "App'n'roll Starter",
        },
      },
    }
    const wrapper = shallow(<Header siteTitle={data.site.siteMetadata.title} />)
    const text = wrapper.find("h1").text()
    expect(text).toEqual("App'n'roll Starter")
  })
})
