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
    background: "transparent",
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
  style(".light", {
    "--main-bg": "#fcfcfc",
    "--bg": "#fcfcfc",
    "--color": "#8f8f8f",
    "--accent": "#0066cc",
    "--hover": "#000",
    "--text": "#000",
  });
  style(".dark", {
    "--main-bg": "#0a0e1e",
    "--bg": "#0b0d1e",
    "--color": "#abb2bf",
    "--accent": "#3a8dc5",
    "--hover": "#fff",
    "--text": "#abb2bf",
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

  style(`${github}`, { transition: "transform 0.2s" });
  style(`${github}:hover`, { transform: "scale(1.3) translateY(-3px)" });

  style(`${header} > span, ${footer} > span`, {
    position: "relative",
    bottom: "0",
    transition: "bottom 0.2s",
  });
  style(`${footer} > span:hover`, {
    bottom: "2px",
  });
  style(`${header} > span:hover`, {
    bottom: "-2px",
  });

  style(`${header} a, ${footer} a`, {
    transition: "color 0.2s",
  });
  style(`${header} a:hover, ${footer} a:hover`, {
    color: "var(--hover)",
  });

  style(`${claim} a, ${resetPassword} a`, { transition: "font-size 0.2s" });
  style(`${claim} a:hover, ${resetPassword} a:hover`, {
    fontSize: "1.05em",
  });

  style("button, input[type='submit']", { transition: "transform 0.2s" });
  style("button:hover, input[type='submit']:hover", {
    transform: "scale(1.05)",
  });
}
