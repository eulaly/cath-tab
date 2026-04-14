import { DEFAULT_VERSION_ID } from "./versions";

const ext = (globalThis as any).browser ?? chrome;
const KEY = "defaultVersionId";

// export async function getVersion(): Promise<string> {
//   const data = await chrome.storage.local.get(KEY);
//   return (data[KEY] as string)
//    ?? DEFAULT_VERSION_ID;
// }

// export async function setVersion(version: string): Promise<void> {
//   await chrome.storage.local.set({
//     [KEY]: version
//   });
// }


export async function getVersion(): Promise<string> {
  const data = await ext.storage.local.get(KEY);
  return (data[KEY] as string)
    ?? DEFAULT_VERSION_ID;
}

export async function setVersion(version: string): Promise<void> {
  await ext.storage.local.set({
    [KEY]: version
  });

}