// @ts-check

const docId = location.search.slice(1);
const cache = ("localStorage" in window && window.localStorage) || null;

export const Cache = {
  /** @type {() => string | null} */
  getText() {
    if (!docId) return null;
    return cache?.getItem(docId + "_text") ?? null;
  },
  /** @type {(val: string | null) => void} */
  setText(val) {
    if (!docId) return;
    if (!val) cache?.removeItem(docId + "_text");
    else cache?.setItem(docId + "_text", String(val));
  },

  /** @type {(defaultValue?: boolean) => boolean} */
  getNightMode(defaultValue) {
    const cacheValue = cache?.getItem("nightMode");
    if (!cacheValue && defaultValue !== undefined) return defaultValue;
    return cacheValue === "true";
  },
  /** @type {(val: boolean) => void} */
  setNightMode(val) {
    cache?.setItem("nightMode", String(val));
  },
};
