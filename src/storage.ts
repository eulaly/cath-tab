import { DEFAULT_VERSION_ID } from "./versions";
import type { UserSettings, VerseOfDay } from "./types";

const SETTINGS_KEY = "settings";
const CACHE_PREFIX = "votd:";

export async function getSettings(): Promise<UserSettings> {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  return {
    defaultVersionId: result[SETTINGS_KEY]?.defaultVersionId ?? DEFAULT_VERSION_ID,
  };
}

export async function setSettings(settings: UserSettings): Promise<void> {
  await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

export async function getCachedVerse(date: string, versionId: string): Promise<VerseOfDay | null> {
  const key = `${CACHE_PREFIX}${date}:${versionId}`;
  const result = await chrome.storage.local.get(key);
  return result[key] ?? null;
}

export async function setCachedVerse(date: string, versionId: string, verse: VerseOfDay): Promise<void> {
  const key = `${CACHE_PREFIX}${date}:${versionId}`;
  await chrome.storage.local.set({ [key]: verse });
}
