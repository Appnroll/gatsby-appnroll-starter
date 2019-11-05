import React, { FunctionComponent } from "react"
import dataModel from "../../static/data-model.json"

/**
 * Data model.
 */

enum ModelKind {
  Heading = "heading",
  Image = "image",
  List = "list",
}

interface DataModel<T extends ModelKind> {
  readonly kind: T
}

// Content model.
interface HeadingContent {
  readonly text: string
}

interface ImageContent {
  readonly source: string
}

interface ListContent {
  readonly heading: string
  readonly items: readonly string[]
}

// Data model.
interface HeadingDataModel
  extends DataModel<ModelKind.Heading>,
    HeadingContent {}
interface ImageDataModel extends DataModel<ModelKind.Image>, ImageContent {}
interface ListDataModel extends DataModel<ModelKind.List>, ListContent {}

type AllModels = HeadingDataModel | ImageDataModel | ListDataModel

const Heading: FunctionComponent<HeadingContent> = ({ text }) => {
  return <h1>{text}</h1>
}
const Image: FunctionComponent<ImageContent> = ({ source }) => {
  return <img src={source} alt="Kitten" />
}
const List: FunctionComponent<ListContent> = ({ heading, items }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// Resolver
const Resolver: FunctionComponent<{ models: AllModels[] }> = ({ models }) => {
  return (
    <>
      {models.map((model, index) => {
        switch (model.kind) {
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

const WorkshopPage: FunctionComponent = () => {
  // Pseudo fetch
  const data = dataModel as AllModels[]
  return <Resolver models={data} />
}

export default WorkshopPage
