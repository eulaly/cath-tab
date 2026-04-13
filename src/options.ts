import { SUPPORTED_VERSIONS } from "./versions"
import { getVersion, setVersion } from "./storage"

async function main() {

  const select =
    document.querySelector("#versionSelect") as HTMLSelectElement

  const status =
    document.querySelector("#status")!

  const current =
    await getVersion()

  for (const v of SUPPORTED_VERSIONS) {

    const opt =
      document.createElement("option")

    opt.value =
      v.id

    opt.textContent =
      v.label

    if (v.id === current)
      opt.selected = true

    select.appendChild(opt)

  }

  document
    .querySelector("#saveBtn")!
    .addEventListener("click", async () => {

      await setVersion(select.value)

      status.textContent = "saved."

    })

}

void main()