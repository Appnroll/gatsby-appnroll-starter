import { Theme } from "./theme"

export const textColor = (name: keyof Theme["color"]["text"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.text[name]

export const backgroundColor = (name: keyof Theme["color"]["background"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.background[name]
