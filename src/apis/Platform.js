// @flow

const normalizeOS = platform => {
  switch (platform) {
    case "win32":
      return "windows";
    case "darwin":
      return "macos";
    case "linux":
      return "linux";
    default:
      return "web";
  }
};

export const OS = normalizeOS(process.platform);

export const select = (obj: Object) =>
  normalizeOS(process.platform) in obj
    ? obj[normalizeOS(process.platform)]
    : obj.default;
