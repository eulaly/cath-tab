import { fetchVerseOfDay } from "./bg";
import { getVersion, setVersion } from "./storage";
import { SUPPORTED_VERSIONS } from "./versions";


async function main() {
  const openOptionsBtn = document.querySelector("#openOptionsBtn") as HTMLButtonElement | null;
  const closeOptionsBtn = document.querySelector("#closeOptionsBtn") as HTMLButtonElement | null;
  const drawerBackdrop = document.querySelector("#drawerBackdrop") as HTMLDivElement | null;
  const optionsDrawer = document.querySelector("#optionsDrawer") as HTMLElement | null;
  if (!openOptionsBtn) throw new Error("missing #openOptionsBtn");
  if (!closeOptionsBtn) throw new Error("missing #closeOptionsBtn");
  if (!drawerBackdrop) throw new Error("missing #drawerBackdrop");
  if (!optionsDrawer) throw new Error("missing #optionsDrawer");
  function openDrawer() {
    drawerBackdrop.hidden = false;
    optionsDrawer.hidden = false;
    optionsDrawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    drawerBackdrop.hidden = true;
    optionsDrawer.hidden = true;
    optionsDrawer.setAttribute("aria-hidden", "true");
  }
  openOptionsBtn.addEventListener("click",openDrawer)
  closeOptionsBtn.addEventListener("click",closeDrawer)
  drawerBackdrop.addEventListener("click",closeDrawer)
  document.addEventListener("keydown",
    (e) => {
      if (e.key === "Escape")
        closeDrawer()
  })

  const verseEl = document.querySelector("#verse");
  const referenceEl = document.querySelector("#reference");
  const versionLinkEl = document.querySelector("#versionLink") as HTMLAnchorElement | null;
  const versionSelectEl = document.querySelector("#versionSelect") as HTMLSelectElement | null;
  const saveOptionsBtnEl = document.querySelector("#saveOptionsBtn") as HTMLButtonElement | null;
  const optionsStatusEl = document.querySelector("#optionsStatus") as HTMLElement | null;

  if (!verseEl) throw new Error("missing #verse");
  if (!referenceEl) throw new Error("missing #reference");
  if (!versionLinkEl) throw new Error("missing #versionLink");
  if (!versionSelectEl) throw new Error("missing #versionSelect");
  if (!saveOptionsBtnEl) throw new Error("missing #saveOptionsBtn");
  if (!optionsStatusEl) throw new Error("missing #optionsStatus");

  const currentVersion = await getVersion();
  const verse = await fetchVerseOfDay(currentVersion);

  verseEl.textContent = verse.text;
  referenceEl.textContent = verse.reference;
  versionLinkEl.href = verse.passageUrl;
  versionLinkEl.textContent = verse.versionCode;

  for (const v of SUPPORTED_VERSIONS) {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = v.label;
    if (v.id === currentVersion) opt.selected = true;
    versionSelectEl.appendChild(opt);
  }

  saveOptionsBtnEl.addEventListener("click", async () => {
    await setVersion(versionSelectEl.value);
    optionsStatusEl.textContent = "Saved. Open a new tab to refresh.";
  });
}


void main()