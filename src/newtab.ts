import { useEffect, useState } from "react";
import { fetchVerseOfDay } from "./bg";
import { getCachedVerse, getSettings, setCachedVerse } from "./storage";
import type { VerseOfDay } from "./types";

function todayUtcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [verse, setVerse] = useState<VerseOfDay | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const settings = await getSettings();
        const date = todayUtcDate();
        const cached = await getCachedVerse(date, settings.defaultVersionId);
        if (cached) {
          setVerse(cached);
          setLoading(false);
          return;
        }

        const fresh = await fetchVerseOfDay(settings.defaultVersionId);
        await setCachedVerse(date, settings.defaultVersionId, fresh);
        setVerse(fresh);
      } catch (err) {
        setError(err instanceof Error ? err.message : "failed to load verse");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <main className="shell"><div className="card">loading…</div></main>;
  if (error) return <main className="shell"><div className="card">{error}</div></main>;
  if (!verse) return <main className="shell"><div className="card">no verse available</div></main>;

  return (
    <main className="shell">
      <article className="card">
        <p className="verse">{verse.plainText}</p>
        <p className="reference">
          <a href={verse.passageUrl} target="_blank" rel="noreferrer">{verse.reference}</a>
        </p>
        <footer className="footer">
          <span>{verse.versionCode}</span>
          <a href="https://www.biblegateway.com/" target="_blank" rel="noreferrer">powered by biblegateway.com</a>
        </footer>
      </article>
    </main>
  );
}
