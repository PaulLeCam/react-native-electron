const remote = window.ReactNativeElectron

export async function getString(): Promise<string> {
  return await remote.getClipboardText()
}

export async function setString(value: string): Promise<void> {
  await remote.setClipboardText(value)
}
