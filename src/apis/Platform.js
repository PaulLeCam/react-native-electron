// @flow

export const OS = process.platform

export const select = (obj: Object) => (process.platform in obj ? obj[process.platform] : obj.default)