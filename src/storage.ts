import { DEFAULT_VERSION_ID } from "./versions";

const KEY = "defaultVersionId";

export async function getVersion(): Promise<string> {
  const data = await chrome.storage.local.get(KEY);
  return (data[KEY] as string)
   ?? DEFAULT_VERSION_ID;
}

export async function setVersion(version: string): Promise<void> {
  await chrome.storage.local.set({
    [KEY]: version
  });
}