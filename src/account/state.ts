import { Cache } from "../cache";
import { Subject } from "../utils";

export type Doc = {
  id: string;
  text: string;
  protected?: string;
  public?: boolean;
};

export const State = {
  isLogged: new Subject<boolean | null>(null),
  userEmail: new Subject(""),
  signupMode: new Subject(false),
  docs: [] as Doc[],
  message: new Subject("Loading..."),
  viewMode: new Subject<"grid" | "list">(
    (localStorage.getItem("notepade_mypage_viewmode") || "list") as
      | "grid"
      | "list",
  ),
  authLock: new Subject(true),
  nightMode: new Subject(
    Cache.getNightMode(
      window.matchMedia?.("(prefers-color-scheme: dark)").matches,
    ),
  ),
};
