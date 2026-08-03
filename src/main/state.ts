import { randomString, Subject, NoteHistory } from "../utils";
import { Cache } from "../cache";

export const State = {
  isIE: !!navigator.userAgent.match(/(msie |rv:)(\d+(\.?_?\d+)+)/i),
  isMobile: window.innerWidth <= 480,
  docId: location.search.slice(1),
  public: new Subject(false),
  protected: new Subject(false),
  status: new Subject("loading..."),
  isLogged: new Subject(!!Cache.getText()),
  hasOwner: new Subject(false),
  isHidden: new Subject(true),
  nightMode: new Subject(
    Cache.getNightMode(
      window.matchMedia?.("(prefers-color-scheme: dark)").matches,
    ),
  ),
  showOptions: new Subject(false),
  showPassword: new Subject(false),
  get readonly() {
    return this.protected.value && this.public.value && !this.isLogged.value;
  },
};
if (!State.docId) location.replace("?" + randomString(6));
else {
  State.docId = State.docId.toLowerCase();
  NoteHistory.add(State.docId);
}
