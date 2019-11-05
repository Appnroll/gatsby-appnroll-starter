import React, { FunctionComponent } from "react"
import componentsDefinition from "../../static/components.json"
import Layout from "../components/layout"

/**
 * Components type system.
 */

enum ModelKind {
  Empty = "",
  Heading = "heading",
  Image = "image",
  List = "list",
}

interface DataModel<T extends ModelKind = ModelKind.Empty> {
  readonly type: T
}

// Used by React components.
interface HeadingContent {
  readonly content: string
}

interface ImageContent {
  readonly source: string
}

interface ListContent {
  readonly headline: string
  readonly items: readonly string[]
}

// Used by resolvers.
interface HeadingDataModel
  extends DataModel<ModelKind.Heading>,
    HeadingContent {}
interface ImageDataModel extends DataModel<ModelKind.Image>, ImageContent {}
interface ListDataModel extends DataModel<ModelKind.List>, ListContent {}

type AllModels = HeadingDataModel | ImageDataModel | ListDataModel

/**
 * Guards
 */

const isHeadingModel = (
  dataModel: DataModel<any>
): dataModel is HeadingDataModel => dataModel.type === ModelKind.Heading

/**
 * Resolver.
 */

const Heading: FunctionComponent<HeadingContent> = ({ content }) => {
  return <h1>{content}</h1>
}

const Image: FunctionComponent<ImageContent> = ({ source }) => {
  return <img src={source} alt="Kitty!" />
}

const List: FunctionComponent<ListContent> = ({ headline, items }) => {
  return (
    <>
      <h2>{headline}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  )
}

const Resolver: FunctionComponent<{ dataModels: AllModels[] }> = ({
  dataModels,
}) => {
  return (
    <>
      {dataModels.map((model, index) => {
        switch (model.type) {
          case ModelKind.Heading:
            return <Heading {...model} key={index} />
          case ModelKind.Image:
            return <Image {...model} key={index} />
          case ModelKind.List:
            return <List {...model} key={index} />
          default:
            return null
        }
      })}
    </>
  )
}

/**
 * Page component is responsible for displaying the data on the page.
 */
const WorkshopPage: FunctionComponent = () => {
  console.log(componentsDefinition)
  return (
    <Layout>
      <Resolver dataModels={componentsDefinition as AllModels[]} />
    </Layout>
  )
}

export default WorkshopPage

// TODO:
// - resolvery komponentów
// - funkcja zwracająca funkcję w theme
// - dodatkowe, prywatne własności w data modelach (Omit)
