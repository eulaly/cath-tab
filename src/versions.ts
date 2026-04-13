import type { BibleVersion } from "./types";

export const SUPPORTED_VERSIONS: BibleVersion[] = [
  { id: "215", code: "RSVCE", label: "revised standard version, catholic edition" },
  { id: "463", code: "NABRE", label: "new american bible, revised edition" }
];

export const DEFAULT_VERSION_ID = "215";