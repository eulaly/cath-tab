import type { VerseOfDay } from "./types";

function decodeHtmlEntities(input: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
}

function mustGetText(parent: Element, selector: string): string {
  const el = parent.querySelector(selector);
  if (!el?.textContent) throw new Error(`missing xml field: ${selector}`);
  return el.textContent.trim();
}

export async function fetchVerseOfDay(versionId: string): Promise<VerseOfDay> {
  const url = `https://www.biblegateway.com/votd/get/?format=atom&version=${encodeURIComponent(versionId)}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`bible gateway fetch failed: ${response.status}`);
  }

  const xml = await response.text();

  if (!xml.includes("<feed") && !xml.includes("<entry")) {
    throw new Error(`unexpected response from bible gateway: ${xml.slice(0, 300)}`);
  }

  const doc = new DOMParser().parseFromString(xml, "application/xml");

  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    throw new Error(`failed to parse atom feed: ${parserError.textContent ?? "unknown parser error"}`);
  }

  const entry = doc.querySelector("entry");
  if (!entry) {
    throw new Error("atom feed did not contain an entry");
  }

  const reference = mustGetText(entry, "title");
  const updated = mustGetText(entry, "updated");
  const htmlText = mustGetText(entry, "content");
  const passageUrl =
    entry.querySelector('link:not([rel])[href]')?.getAttribute("href") ??
    "https://www.biblegateway.com/";
  const idText = mustGetText(entry, "id");
  const versionCode = idText.split(":").pop() ?? "";

  const feedSelfLink = doc.querySelector('feed > link[rel="self"]')?.getAttribute("href") ?? "";
  const versionIdMatch = feedSelfLink.match(/[?&]version=(\d+)/);
  const resolvedVersionId = versionIdMatch?.[1] ?? versionId;

  return {
    reference,
    htmlText,
    plainText: decodeHtmlEntities(htmlText).replace(/\s+/g, " ").trim(),
    passageUrl,
    updated,
    versionCode,
    versionId: resolvedVersionId,
  };
}