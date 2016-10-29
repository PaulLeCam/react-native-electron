// @flow

import { clipboard } from 'electron'

export const getString = (type: ?string): Promise<?string> => {
  return Promise.resolve(clipboard.readText(type))
}

export const setString = (text: string, type: ?string) => {
  clipboard.writeText(text, type)
}
