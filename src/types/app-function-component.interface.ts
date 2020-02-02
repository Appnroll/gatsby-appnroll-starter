import { FunctionComponent } from "react"

export default interface AppFunctionComponent<P = {}>
  extends FunctionComponent<Readonly<P & { className?: string }>> {}
