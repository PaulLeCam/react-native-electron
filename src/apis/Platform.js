// @flow


let OS
switch (process.platform) {
  case 'win32':
    OS = 'windows'
    break
  case 'darwin':
    OS = 'macos'
    break
  case 'linux':
    OS = 'linux'
    break
  default:
    OS = 'web'
    break
}
export const OS

export const select = (obj: Object) => (process.platform in obj ? obj[process.platform] : obj.default)