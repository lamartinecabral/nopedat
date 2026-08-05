const docId = location.search.slice(1);
const cache = ("localStorage" in window && window.localStorage) || null;

export const Cache = {
  getText() {
    if (!docId) return null;
    return cache?.getItem(docId + "_text") ?? null;
  },
  setText(val: string | null) {
    if (!docId) return;
    if (!val) cache?.removeItem(docId + "_text");
    else cache?.setItem(docId + "_text", String(val));
  },

  getNightMode(defaultValue?: boolean) {
    const cacheValue = cache?.getItem("nightMode");
    if (!cacheValue && defaultValue !== undefined) return defaultValue;
    return cacheValue === "true";
  },
  setNightMode(val: boolean) {
    cache?.setItem("nightMode", String(val));
  },
};
