import * as codemirror from "./codemirror";

declare global {
  interface Window {
    codemirror: typeof codemirror;
  }
}

window.codemirror = codemirror;
