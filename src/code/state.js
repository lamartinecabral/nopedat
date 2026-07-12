// @ts-check

import { randomString, Subject, NoteHistory } from "../utils";
import { Cache } from "../cache";
import { parseLanguage as lang } from "./model";

export const State = {
  docId: location.search.slice(1),
  public: new Subject(false),
  protected: new Subject(false),
  status: new Subject("loading..."),
  isLogged: new Subject(false),
  hasOwner: new Subject(false),
  isHidden: new Subject(true),
  showOptions: new Subject(false),
  showPassword: new Subject(false),
  language: new Subject(lang(location.hash.slice(1))),
  showPreview: new Subject(false),
  nightMode: new Subject(
    Cache.getNightMode(
      window.matchMedia?.("(prefers-color-scheme: dark)").matches,
    ),
  ),
  isMobile: new Subject(window.innerWidth <= 480),

  /** @type {string | null} */
  lastLoadedText: null,

  get readonly() {
    return this.protected.value && this.public.value && !this.isLogged.value;
  },
};
if (!State.docId) location.replace("?" + randomString(6));
else {
  State.docId = State.docId.toLowerCase();
  NoteHistory.add(State.docId);
  if (!location.hash.slice(1)) {
    const language =
      localStorage && localStorage.getItem(State.docId + "_lang");
    if (language) State.language.pub(lang(language));
  }
}
