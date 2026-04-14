import { fetchVerseOfDay } from "./bg";
import { getVersion, setVersion } from "./storage";
import { SUPPORTED_VERSIONS } from "./versions";

function safeBibleGatewayUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.protocol === "https:" && url.hostname === "www.biblegateway.com") {
      return url.toString();
    }
  } catch {}
  return "https://www.biblegateway.com/";
}

function renderVerse(
  verseEl: Element,
  referenceEl: Element,
  versionLinkEl: HTMLAnchorElement,
  verse: Awaited<ReturnType<typeof fetchVerseOfDay>>
): void {
  verseEl.textContent = verse.text;
  referenceEl.textContent = verse.reference;
  versionLinkEl.href = safeBibleGatewayUrl(verse.passageUrl);
  versionLinkEl.textContent = verse.versionCode;
}

async function main() {
  const openSettingsBtn = document.querySelector("#openSettingsBtn") as HTMLButtonElement | null;
  const closeSettingsBtn = document.querySelector("#closeSettingsBtn") as HTMLButtonElement | null;
  const drawerBackdrop = document.querySelector("#drawerBackdrop") as HTMLDivElement | null;
  const settingsDrawer = document.querySelector("#settingsDrawer") as HTMLElement | null;

  const versionSelectEl = document.querySelector("#versionSelect") as HTMLSelectElement | null;
  const saveSettingsBtnEl = document.querySelector("#saveSettingsBtn") as HTMLButtonElement | null;
  const settingsStatusEl = document.querySelector("#settingsStatus") as HTMLElement | null;

  const verseEl = document.querySelector("#verse");
  const referenceEl = document.querySelector("#reference");
  const versionLinkEl = document.querySelector("#versionLink") as HTMLAnchorElement | null;

  if (!openSettingsBtn) throw new Error("missing #openSettingsBtn");
  if (!closeSettingsBtn) throw new Error("missing #closeSettingsBtn");
  if (!drawerBackdrop) throw new Error("missing #drawerBackdrop");
  if (!settingsDrawer) throw new Error("missing #settingsDrawer");

  if (!versionSelectEl) throw new Error("missing #versionSelect");
  if (!saveSettingsBtnEl) throw new Error("missing #saveSettingsBtn");
  if (!settingsStatusEl) throw new Error("missing #settingsStatus");

  if (!verseEl) throw new Error("missing #verse");
  if (!referenceEl) throw new Error("missing #reference");
  if (!versionLinkEl) throw new Error("missing #versionLink");


  function openDrawer() {
    drawerBackdrop.hidden = false;
    settingsDrawer.hidden = false;
    settingsDrawer.setAttribute("aria-hidden", "false");
    settingsStatusEl.textContent = "";
  }
  function closeDrawer() {
    drawerBackdrop.hidden = true;
    settingsDrawer.hidden = true;
    settingsDrawer.setAttribute("aria-hidden", "true");
  }

  openSettingsBtn.addEventListener("click",openDrawer)
  closeSettingsBtn.addEventListener("click",closeDrawer)
  drawerBackdrop.addEventListener("click",closeDrawer)
  document.addEventListener("keydown",
    (e) => {
      if (e.key === "Escape" && !settingsDrawer.hidden)
        closeDrawer()
  })

  const currentVersion = await getVersion();
  try {
    const verse = await fetchVerseOfDay(currentVersion);
    renderVerse(verseEl, referenceEl, versionLinkEl, verse);
  } catch (err) {
    verseEl.textContent = "Unable to load Verse of the Day.";
    referenceEl.textContent = err instanceof Error ? err.message : "unknown error" ;
  }
  
  for (const v of SUPPORTED_VERSIONS) {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = v.label;
    if (v.id === currentVersion) opt.selected = true;
    versionSelectEl.appendChild(opt);
  }

  saveSettingsBtnEl.addEventListener("click", async () => {
    await setVersion(versionSelectEl.value);
    settingsStatusEl.textContent = "Saved. Open a new tab to refresh.";
  });

}

void main()