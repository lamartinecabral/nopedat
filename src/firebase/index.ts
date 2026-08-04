import * as firebase from "./firebase";

declare global {
  interface Window {
    _firebase: typeof firebase;
  }
}

window._firebase = firebase;
