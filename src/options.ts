import { SUPPORTED_VERSIONS } from "./versions"
import { getVersion, setVersion } from "./storage"

async function main() {
  const app = document.querySelector("#app")
  if (!app) throw new Error("missing #app")

  const current = await getVersion()

  const wrapper = document.createElement("main")
  const card = document.createElement("div")
  const heading = document.createElement("h1")
  const label = document.createElement("label")
  const select = document.createElement("select")
  const button = document.createElement("button")
  const status = document.createElement("p")

  wrapper.className = "options-shell"
  card.className = "card"
  heading.textContent = "catholic tab"
  label.htmlFor = "version"
  label.textContent = "default bible version"
  select.id = "version"
  button.textContent = "save"

  for (const v of SUPPORTED_VERSIONS) {
    const opt = document.createElement("option")
    opt.value = v.id
    opt.textContent = v.label
    if (v.id === current) opt.selected = true
    select.appendChild(opt)
  }

  button.addEventListener("click", async () => {
    await setVersion(select.value)
    status.textContent = "saved."
  })

  card.appendChild(heading)
  card.appendChild(label)
  card.appendChild(select)
  card.appendChild(button)
  card.appendChild(status)
  wrapper.appendChild(card)
  app.appendChild(wrapper)
}

void main()