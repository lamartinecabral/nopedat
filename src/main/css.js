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

export function initCss() {
  const supportCssVar = !!window.CSS?.supports?.("color: var(--x)");
  const [background, color] = supportCssVar
    ? ["var(--background)", "var(--color)"]
    : ["white", "black"];

  style("*", {
    fontFamily: "monospace",
    boxSizing: "border-box",
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
    top: "0",
  });
  style(status + " span", {
    background,
    color,
  });
  style(textarea, {
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
  style(github, {
    position: "fixed",
    background: "#fff",
    borderRadius: "50%",
    bottom: "3px",
    left: "calc(50% - 12px)",
    height: "24px",
  });
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
    bottom: "6px",
    right: "3em",
  });
  style(`${header} a, ${footer} a, ${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    cursor: "pointer",
    background,
    color,
  });
  style(`${header} a:hover`, { position: "relative", top: "2px" });
  style(`${footer} a:hover, ${claim} a:hover, ${resetPassword} a:hover`, {
    position: "relative",
    bottom: "2px",
  });
  style(backdrop, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)",
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
  style(`${submitButton} input`, {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    background: "var(--accent)",
    color: "var(--accent-text)",
    border: "none",
    borderRadius: "4px",
    fontFamily: "inherit",
  });
  style(`${submitButton} input:hover`, {
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
    "--accent-light": "#007bff",
    "--accent-text-light": "#ffffff",
    "--accent-dark": "#007acc",
    "--accent-text-dark": "#ffffff",
  });
  style(".light", {
    "--background": "var(--light)",
    "--color": "var(--dark)",
    "--accent": "var(--accent-light)",
    "--accent-text": "var(--accent-text-light)",
  });
  style(".dark", {
    "--background": "var(--nightbg)",
    "--color": "var(--nightcolor)",
    "--accent": "var(--accent-dark)",
    "--accent-text": "var(--accent-text-dark)",
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
