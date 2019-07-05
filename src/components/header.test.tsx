import { render } from "@testing-library/react"
import Enzyme, { shallow } from "enzyme"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import styled from "styled-components"
import Header from "./header"

Enzyme.configure({ adapter: new Adapter() })

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
    const wrapper = shallow(<Header siteTitle="title" />)
    const text = wrapper.find("h1").text()
    expect(text).toEqual("title")
  })
})

