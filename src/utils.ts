export function randomString(length: number) {
  let str = Math.floor(Math.random() * 36 ** length).toString(36);
  while (str.length < length) str = "0" + str;
  return str;
}

export function trunc(str: string, maxLen: number) {
  return String(str).length > maxLen
    ? String(str).substring(0, maxLen - 1) + "…"
    : str;
}

export class Subject<T> {
  value: T;
  pub: (value: T) => void;
  sub: (
    callback: (value: T) => void,
    opts?: { latest?: boolean },
  ) => () => boolean;

  constructor(value: T) {
    this.value = value;
    let c = 0;
    const cb = {};
    this.pub = function (value) {
      if (value === this.value) return;
      this.value = value;
      for (const i in cb) cb[i](value);
    };
    this.sub = function (callback, opts) {
      const latest = opts?.latest ?? true;
      if (latest && this.value !== undefined) callback(this.value);
      const i = c++;
      cb[i] = callback;
      return () => delete cb[i];
    };
  }
}

export function debounce<T extends (...args: any) => any>(
  handler: T,
  timeout: number,
) {
  let id;
  return (...args: Parameters<T>) => {
    clearTimeout(id);
    id = setTimeout(() => {
      handler(...args);
    }, timeout);
  };
}

export function delayLatest<T extends (...args: any) => any>(handler: T) {
  let id;
  return (timeout: number, ...args: Parameters<T>) => {
    clearTimeout(id);
    id = setTimeout(() => {
      handler(...args);
    }, timeout);
  };
}

/** @type {<T>(val: T | null | undefined) => T} */
export function assert<T>(val: T | null | undefined): T {
  if (val === null || val === undefined) throw new Error("invalid value");
  return val;
}

export const NoteHistory = {
  get entries(): Record<string, string> {
    return JSON.parse(localStorage.getItem("__NoteHistory") || "{}");
  },
  set entries(val) {
    localStorage.setItem("__NoteHistory", JSON.stringify(val));
  },
  add: function (id) {
    const entries = this.entries;
    entries[id] = new Date().toISOString();
    this.entries = entries;
  },
  remove: function (id) {
    const entries = this.entries;
    delete entries[id];
    this.entries = entries;
  },
};

export function toDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    let fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.readAsDataURL(file);
  });
}

export function imgResize(dataURL, maxSize): Promise<string> {
  return new Promise((resolve) => {
    let img = document.createElement("img");
    img.src = dataURL;
    img.onload = () => {
      let multiplier = Math.min(maxSize / Math.max(img.height, img.width), 1);

      let canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * multiplier);
      canvas.height = Math.round(img.height * multiplier);
      let ctx = canvas.getContext("2d");

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/webp"));
    };
  });
}
