import { fetchVerseOfDay } from "./bg"
import { getVersion } from "./storage"

async function main() {
  const app = document.querySelector("#app")
  if (!app) throw new Error("missing #app")

  try {
    const version = await getVersion()
    const verse = await fetchVerseOfDay(version)

    const mainEl = document.createElement("main")
    const card = document.createElement("div")
    const verseP = document.createElement("p")
    const refP = document.createElement("p")
    const link = document.createElement("a")
    const footer = document.createElement("footer")

    mainEl.className = "shell"
    card.className = "card"
    verseP.className = "verse"
    refP.className = "ref"

    verseP.textContent = verse.plainText
    link.href = verse.passageUrl
    link.target = "_blank"
    link.rel = "noreferrer"
    link.textContent = verse.reference
    footer.textContent = `${verse.versionCode} • powered by biblegateway.com`

    refP.appendChild(link)
    card.appendChild(verseP)
    card.appendChild(refP)
    card.appendChild(footer)
    mainEl.appendChild(card)
    app.appendChild(mainEl);
    } catch (err) {
    console.error(err);
    const pre = document.createElement("pre");
    pre.textContent = err instanceof Error ? err.stack ?? err.message : String(err);
    app.appendChild(pre);
    }
}

void main();