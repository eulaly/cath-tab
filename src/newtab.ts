import { fetchVerseOfDay } from "./bg"
import { getVersion } from "./storage"

async function main() {

  const version =
    await getVersion()

  const verse =
    await fetchVerseOfDay(version)

  document.querySelector("#verse")!
    .textContent = verse.text

  document.querySelector("#reference")!
    .textContent = verse.reference

  const link =
    document.querySelector("#versionLink") as HTMLAnchorElement

  link.href =
    verse.passageUrl

  link.textContent =
    verse.versionCode

  document
    .querySelector("#optionsBtn")!
    .addEventListener("click", () =>
      chrome.runtime.openOptionsPage()
    )

}

void main()