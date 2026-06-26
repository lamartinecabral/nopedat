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
  const [background, color] = supportCssVar
    ? ["var(--background)", "var(--color)"]
    : ["white", "black"];

  style("*", {
    fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
    boxSizing: "border-box",
    accentColor: "var(--accent)",
    outlineColor: "var(--accent)",
  });
  style("*:not(textarea):not(input)", {
    userSelect: "none",
  });
  const appRule = style(app, {
    background,
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
    top: "3px",
  });
  style(status + " span", {
    background,
    color,
  });
  style(textarea, {
    fontSize: "1rem",
    width: "calc(100% - 24px)",
    height: "calc(100% - 24px)",
    margin: "12px",
    padding: "6px",
    border: "1px solid",
    borderRadius: "4px",
    resize: "none",
    tabSize: "4",
    background: "transparent",
    color,
    overflowAnchor: "none", // it fixes chromium's scroll anchor bug https://bugs.chromium.org/p/chromium/issues/detail?id=997266
  });
  style(`${textarea}:read-only`, {
    outline: "none",
  });
  style(github, {
    position: "fixed",
    borderRadius: "50%",
    bottom: "3px",
    left: "calc(50% - 12px)",
    height: "24px",
  });
  !State.isMobile &&
    style(`${github}:hover`, {
      bottom: "5px",
    });
  style(header, {
    position: "fixed",
    top: "4px",
    right: "3em",
  });
  style(footer, {
    position: "fixed",
    bottom: "4px",
    right: "3em",
  });
  style(`${header} a, ${footer} a, ${claim} a, ${resetPassword} a`, {
    cursor: "pointer",
    background,
    color,
  });
  style(`${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    color: "var(--accent)",
  });
  style(`${header} a, ${footer} a`, {
    textDecoration: "none",
    border: "1px solid",
    borderRadius: "2px",
    padding: "0 2px",
  });
  if (!State.isMobile) {
    style(
      `${header} a:hover, ${footer} a:hover, ${claim} a:hover, ${resetPassword} a:hover`,
      { position: "relative", bottom: "2px" },
    );
    style(`${header} a:hover`, { bottom: "-2px" });
    style(`${header} a:hover, ${footer} a:hover`, {
      color: "var(--hover)",
    });
  }
  style(backdrop, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(2px)",
    zIndex: "1",
  });
  style(modal, {
    background,
    padding: "2em",
    position: "absolute",
    bottom: "50%",
    right: "50%",
    transform: "translate(50%, 50%)",
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
  });
  style(submitButton, {
    textAlign: "center",
    marginTop: "1em",
  });
  style("button, input[type='submit']", {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    background: "var(--accent)",
    color: "var(--accent-text)",
    border: "none",
    borderRadius: "4px",
    fontFamily: "inherit",
  });
  !State.isMobile &&
    style("button:hover, input[type='submit']:hover", {
      position: "relative",
      bottom: "2px",
    });
  style(resetPassword, {
    textAlign: "center",
    margin: "1em 0 -1em 0",
  });
  style(":root", {
    "--light": "#fff",
    "--dark": "#000",
    "--nightcolor": "#abb2bf",
    "--nightbg":
      "linear-gradient(135deg, #120c1f 0%, #080e1e 60%, #030712 100%)",
    "--accent-light": "#0066cc",
    "--accent-text-light": "#ffffff",
    "--accent-dark": "#3a8dc5",
    "--accent-text-dark": "#ffffff",
    "--hover-light": "var(--accent-light)",
    "--hover-dark": "#ffffff",
  });
  style(".light", {
    "--background": "var(--light)",
    "--color": "var(--dark)",
    "--accent": "var(--accent-light)",
    "--accent-text": "var(--accent-text-light)",
    "--hover": "var(--hover-light)",
  });
  style(".dark", {
    "--background": "var(--nightbg)",
    "--color": "var(--nightcolor)",
    "--accent": "var(--accent-dark)",
    "--accent-text": "var(--accent-text-dark)",
    "--hover": "var(--hover-dark)",
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
