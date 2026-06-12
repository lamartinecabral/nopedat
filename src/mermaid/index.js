// @ts-check
import { State } from "./state";
import * as firebase from "../firebase";
import { Cache } from "../cache";
import { assert } from "../utils";

/** @type {import('mermaid').default} */ // @ts-ignore
const { run: runMermaid } = window.mermaid;

const { auth, db } = firebase.initApp(State.docId || "");
const { onAuthStateChanged } = firebase.auth;
const { doc, onSnapshot } = firebase.firestore;

var app = {
  elem: (id) => assert(document.getElementById(id)),
  content: () => app.elem("content"),

  init: function () {
    console.log("initMermaid");
    if (!State.docId)
      app.setContent("# Mermaid in browser\n\nRendered by **mermaid**.");
    else {
      const text = Cache.getText();
      if (text !== null) app.setContent(text);
      app.liveContent(State.docId);
      app.liveAuth();
    }
  },

  /** @param {string} text */
  setContent: function (text) {
    const len = app.content().children.length;
    for (let i = len - 1; i >= 0; i--) {
      const child = app.content().children[i];
      app.content().removeChild(child);
    }

    if (!text?.trim()) return;

    const pre = document.createElement("pre");
    pre.className = "mermaid";
    pre.innerHTML = text;

    app.content().appendChild(pre);

    runMermaid().catch((err) => {
      console.error(err);
      pre.innerHTML = err?.error?.stack ?? err?.message ?? String(err);
    });
  },

  liveAuth: function () {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        console.log("user logged");
      } else {
        console.log("No user.");
      }
    });
  },

  /** @type {() => void} */ // @ts-ignore
  killLiveContent: null,
  liveContent: function (docId, col = "docs") {
    app.killLiveContent = onSnapshot(
      doc(db, col, docId),
      (res) => {
        if (res.metadata.hasPendingWrites) return;
        app.setContent(res.exists() ? res.data().text : "");
        if (Cache.getText() !== null) {
          Cache.setText(res.exists() ? res.data().text : "");
        }
      },
      (err) => {
        console.error(err);
        app.setContent(err.message);
      },
    );
  },
};

app.init();
