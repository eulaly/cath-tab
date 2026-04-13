import { useEffect, useState } from "react";
import { getSettings, setSettings } from "./storage";
import { SUPPORTED_VERSIONS } from "./versions";

export default function OptionsApp() {
  const [versionId, setVersionId] = useState("215");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void (async () => {
      const settings = await getSettings();
      setVersionId(settings.defaultVersionId);
    })();
  }, []);

  async function onSave() {
    await setSettings({ defaultVersionId: versionId });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <main className="options-shell">
      <section className="card">
        <h1>catholic tab</h1>
        <label htmlFor="version">default bible version</label>
        <select id="version" value={versionId} onChange={(e) => setVersionId(e.target.value)}>
          {SUPPORTED_VERSIONS.map((v) => (
            <option key={v.id} value={v.id}>{v.label}</option>
          ))}
        </select>
        <button onClick={onSave}>save</button>
        {saved ? <p>saved.</p> : null}
      </section>
    </main>
  );
}