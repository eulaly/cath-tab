import type { BibleVersion } from "./types";

export const SUPPORTED_VERSIONS: BibleVersion[] = [
  { id: "215", code: "RSVCE", label: "Revised Standard Version, Catholic Edition" },
  { id: "115", code: "NABRE", label: "New American Bible, Revised Edition" },
  { id: "63", code: "DR1899", label: "Douay-Rheims, 1899 Edition"}
];

export const DEFAULT_VERSION_ID = "215";