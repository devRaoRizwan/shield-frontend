import { useEffect } from "react";

const SITE = "https://www.shieldhouse.pk";
const SUFFIX = "Shield House";

function setMeta(selector, attr, value, content) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement(selector.startsWith("link") ? "link" : "meta");
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute(selector.startsWith("link") ? "href" : "content", content);
}

// Search engines render the SPA, so per-route tags written on mount are indexed.
export function useSeo({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title.includes(SUFFIX) ? title : `${title} — ${SUFFIX}`;
    const url = `${SITE}${path}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('link[rel="canonical"]', "rel", "canonical", url);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
  }, [title, description, path]);
}

// Injects a JSON-LD block for the current route. Serialised so the effect only
// re-runs when the data actually changes, not on every render.
export function useJsonLd(id, data) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = json;
    document.head.appendChild(script);

    return () => script.remove();
  }, [id, json]);
}
