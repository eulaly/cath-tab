export type BibleVersion = {
  id: string;
  code: string;
  label: string;
};

export type VerseOfDay = {
  reference: string;
  htmlText: string;
  plainText: string;
  passageUrl: string;
  updated: string;
  versionCode: string;
  versionId: string;
};

export type UserSettings = {
  defaultVersionId: string;
};