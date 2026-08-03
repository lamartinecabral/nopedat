import { style } from "../freedom";
import { assert } from "../utils";
import {
  app,
  status,
  textarea,
  github,
  header,
  footer,
  claim,
  resetPassword,
  backdrop,
  modal,
  optionsModal,
  submitButton,
  theme,
  markdown,
  code,
} from "./refs";
import { State } from "./state";
import {
  baseStyle,
  buttonStyle,
  darkTheme,
  lightTheme,
  supportCssVar,
  vars,
} from "../theme";

export function initCss() {
  baseStyle();
  buttonStyle();
  style("*:not(textarea):not(input)", {
    userSelect: "none",
  });
  style("label", {
    color: vars.text,
  });
  const appRule = style(app, {
    background: vars.mainBg,
    color: vars.color,
    margin: "0",
    padding: "0",
    overflow: "hidden",
    height: "100vh",
  });
  style(status, {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    top: "4px",
  });
  style(status + " span", {
    background: vars.bg,
    color: vars.color,
    fontStyle: "italic",
    borderRadius: "4px",
  });
  style(textarea, {
    fontSize: "1rem",
    width: "calc(100% - 24px)",
    height: "calc(100% - 24px)",
    margin: "12px",
    padding: "6px",
    border: `1px solid ${vars.color}`,
    borderRadius: "4px",
    resize: "none",
    tabSize: "4",
    background: vars.bg,
    color: vars.text,
    overflowAnchor: "none", // it fixes chromium's scroll anchor bug https://bugs.chromium.org/p/chromium/issues/detail?id=997266
  });
  style(`${textarea}:read-only`, {
    outline: "none",
  });
  style(github, {
    position: "fixed",
    bottom: "3px",
    left: "calc(50% - 12px)",
    height: "24px",
  });
  style(`${github} svg`, { width: "24px" });
  style(`.light ${github} a`, { color: vars.accent });
  style(`.dark ${github} a`, { color: vars.mainBg });
  style(`${header}, ${footer}`, { position: "fixed", right: "24px" });
  style(`${header} > span, ${footer} > span`, { display: "inline-block" });
  style(`${header}`, { top: "-2px" });
  style(`${header} > span`, { paddingTop: "6px" });
  style(`${footer}`, { bottom: "-2px" });
  style(`${footer} > span`, { paddingBottom: "3px" });
  style(`${footer} > span a`, { height: "21px", display: "inline-block" });
  style(`${footer} > span a svg`, { height: "11px", margin: "4px 0" });
  style(backdrop, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: "1",
  });
  style(modal, { top: "50%" }); // fallback for browsers that don't support min() function
  style(modal, {
    background: vars.bg,
    padding: "2em",
    position: "absolute",
    top: "min(50%, 50vw)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: vars.color,
    border: `1px solid ${vars.color}`,
    borderRadius: "4px",
  });
  style(optionsModal + " > div:nth-child(2)", {
    marginTop: "0.5em",
  });
  style(optionsModal + " > div:nth-child(3)", {
    marginTop: "1em",
    textAlign: "center",
  });
  style(claim, {
    textAlign: "center",
    marginBottom: "1em",
    height: "2ch",
  });
  style(submitButton, {
    textAlign: "center",
    marginTop: "1em",
  });
  style(resetPassword, {
    textAlign: "center",
    margin: "1em 0 -1em 0",
    height: "2ch",
  });
  themeRules.light = lightTheme();
  themeRules.dark = darkTheme();
  !supportCssVar &&
    style(`${theme}, ${code}, ${markdown}`, {
      display: "none",
    });

  const setHeight = () =>
    (assert(appRule).style.height = window.innerHeight + "px");
  setHeight();
  window.addEventListener("resize", setHeight);
}

export function initAnimations() {
  if (State.isMobile) return;

  const strMap = (str, sep, fn) => String(str).split(sep).map(fn).join(sep);
  const hover = (selectors) => strMap(selectors, ",", (s) => `${s}:hover`);
  const transition = (props: string[] = []) => ({
    transition: props.map((p) => `${p} 0.2s`).join(", "),
  });

  style(github, { cursor: "pointer", ...transition(["transform"]) });
  style(`${github} object`, { pointerEvents: "none" });
  style(hover(github), { transform: "scale(1.3) translateY(-3px)" });

  style(`${header} > span, ${footer} > span`, {
    position: "relative",
    bottom: "0",
    ...transition(["bottom"]),
  });
  style(hover(`${footer} > span`), { bottom: "2px" });
  style(hover(`${header} > span`), { bottom: "-2px" });
}

const themeRules: Record<string, CSSStyleRule | null> = {
  light: null,
  dark: null,
};
