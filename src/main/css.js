// @ts-check

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

export function initCss() {
  const supportCssVar = !!window.CSS?.supports?.("color: var(--x)");
  const [background, mainBg, color, accentColor, textColor] = supportCssVar
    ? [
        "var(--bg)",
        "var(--main-bg)",
        "var(--color)",
        "var(--accent)",
        "var(--text)",
      ]
    : ["white", "white", "black", "#06c", "black"];

  style("*", {
    fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
    boxSizing: "border-box",
    accentColor,
    outlineColor: accentColor,
  });
  style("*:not(textarea):not(input)", {
    userSelect: "none",
  });
  const appRule = style(app, {
    background: mainBg,
    color,
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
    background,
    color,
    fontStyle: "italic",
    borderRadius: "4px",
  });
  style(textarea, {
    fontSize: "1rem",
    width: "calc(100% - 24px)",
    height: "calc(100% - 24px)",
    margin: "12px",
    padding: "6px",
    border: `1px solid ${color}`,
    borderRadius: "4px",
    resize: "none",
    tabSize: "4",
    background,
    color: textColor,
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
  style(`${header}, ${footer}`, { position: "fixed", right: "24px" });
  style(`${header} > span, ${footer} > span`, { display: "inline-block" });
  style(`${header}`, { top: "-2px" });
  style(`${header} > span`, { paddingTop: "6px" });
  style(`${footer}`, { bottom: "-2px" });
  style(`${footer} > span`, { paddingBottom: "6px" });
  style(`${header} a, ${footer} a, ${claim} a, ${resetPassword} a`, {
    cursor: "pointer",
    background,
    color,
  });
  style(`${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    color: accentColor,
  });
  style(`${header} a, ${footer} a`, {
    textDecoration: "none",
    border: "1px solid",
    borderRadius: "2px",
    padding: "0 2px",
  });
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
  style(modal, {
    background,
    padding: "2em",
    position: "absolute",
    top: "min(50%, 50vw)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color,
    border: `1px solid ${color}`,
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
  style("button, input[type='submit']", {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    background: accentColor,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontFamily: "inherit",
    fontSize: "inherit",
  });
  style(resetPassword, {
    textAlign: "center",
    margin: "1em 0 -1em 0",
    height: "2ch",
  });
  themeRules.light = style(".light", {
    "--main-bg": "#edf2fa",
    "--bg": "#ffffff",
    "--color": "#81a7e4",
    "--accent": "#0957d0",
    "--text": "#474747",
  });
  themeRules.dark = style(".dark", {
    "--main-bg": "#1f2020",
    "--bg": "#282828",
    "--color": "#606060",
    "--accent": "#3a8dc5",
    "--text": "#fff",
  });
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
  const transition = (props = []) => ({
    transition: props.map((p) => `${p} 0.2s`).join(", "),
  });

  style(github, transition(["transform"]));
  style(hover(github), { transform: "scale(1.3) translateY(-3px)" });

  style(`${header} > span, ${footer} > span`, {
    position: "relative",
    bottom: "0",
    ...transition(["bottom"]),
  });
  style(hover(`${footer} > span`), { bottom: "2px" });
  style(hover(`${header} > span`), { bottom: "-2px" });

  style(`${header} a, ${footer} a`, transition(["color"]));
  style(hover(`${header} a, ${footer} a`), { color: "var(--text)" });

  style(`${claim} a, ${resetPassword} a`, transition(["font-size"]));
  style(hover(`${claim} a, ${resetPassword} a`), { fontSize: "1.05em" });

  style("button, input[type='submit']", transition(["transform"]));
  style(hover("button, input[type='submit']"), { transform: "scale(1.05)" });
}

/** @type {Record<string, CSSStyleRule | null>} */
const themeRules = {
  light: null,
  dark: null,
};

export function setGithubIconColor() {
  const nightMode = State.nightMode.value;
  const cssRule = themeRules[nightMode ? "dark" : "light"];

  const color = cssRule?.style.getPropertyValue(
    nightMode ? "--main-bg" : "--accent",
  );

  if (!color) return;

  const obj = github().querySelector("object");
  const svg = obj?.contentDocument?.querySelector("svg");

  if (!svg) return;

  svg.style.setProperty("color", color);
}
