// @ts-check

import { style } from "../freedom";
import { assert } from "../utils";
import {
  app,
  status,
  header,
  claim,
  resetPassword,
  backdrop,
  modal,
  optionsModal,
  submitButton,
  langSelect,
  editor,
  preview,
  footer,
} from "./refs";
import { State } from "./state";

export function initCss() {
  style("*", {
    fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
    boxSizing: "border-box",
    accentColor: "var(--accent)",
    outlineColor: "var(--accent)",
  });
  style("label", {
    color: "var(--text)",
  });
  const appRule = style(app, {
    display: "flex",
    margin: "0",
    background: "var(--main-bg)",
    color: "var(--color)",
    height: "100vh",
  });
  style("main", {
    height: "calc(100% - 24px)",
    width: "calc(100% - 24px)",
    margin: "12px",
  });
  style(editor, {
    height: "100%",
    scrollbarColor: "var(--color) transparent",
    color: "var(--text)",
    background: "var(--bg)",
    border: `1px solid var(--color)`,
    borderRadius: "4px",
    overflow: "auto",
  });
  style(status, {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    top: "4px",
    zIndex: "10",
  });
  style(status + " span", {
    background: "var(--bg)",
    color: "var(--color)",
    fontStyle: "italic",
    borderRadius: "4px",
  });
  style(`${header}, ${footer}`, {
    position: "fixed",
    width: "inherit",
    left: "0px",
    zIndex: "15",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  });
  style(`${header}`, {
    top: "3px",
  });
  style(`${footer}`, {
    bottom: "4px",
  });
  style(
    `${header} a, ${header} select, ${footer} a, ${claim} a, ${resetPassword} a`,
    {
      cursor: "pointer",
      background: "var(--bg)",
      color: "var(--color)",
    },
  );
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
  style(backdrop, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: "20",
  });
  style(modal, {
    background: "var(--bg)",
    padding: "2em",
    position: "absolute",
    top: "min(50%, 50vw)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "var(--color)",
    border: `1px solid var(--color)`,
    borderRadius: "4px",
  });
  style(optionsModal + " > div:nth-child(2)", {
    marginTop: "0.5em",
  });
  style(optionsModal + " > div:nth-child(3)", {
    marginTop: "1em",
    textAlign: "center",
  });
  style(`${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    color: "var(--accent)",
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
    background: "var(--accent)",
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
  style(langSelect, {
    border: "1px solid",
    borderRadius: "2px",
    color: "var(--color)",
    background: "var(--bg)",
  });
  style(":root", {
    "--light": "#fff",
    "--dark": "#000",
    "--nightcolor": "#abb2bf",
    "--nightbg": "#181b20",
    "--splitsize": "60vw",
  });
  style(".light", {
    "--main-bg": "#edf2fa",
    "--bg": "#ffffff",
    "--color": "#81a7e4",
    "--accent": "#0957d0",
    "--text": "#474747",
  });
  style(".dark", {
    "--main-bg": "#1f2020",
    "--bg": "#282828",
    "--color": "#606060",
    "--accent": "#3a8dc5",
    "--text": "#fff",
  });
  style("main.split", {
    width: "var(--splitsize)",
    resize: "horizontal",
    overflow: "auto",
    marginRight: "0px",
  });
  style(preview, {
    display: "none",
  });
  style(`main.split + ${preview}`, {
    display: "unset",
    flexGrow: "1",
    width: "0",
    margin: "12px",
    boxSizing: "border-box",
    background: "#fff",
  });
  style(".cm-editor", {
    backgroundColor: "var(--bg)",
  });

  const resizeListener = () => {
    State.isMobile.pub(window.innerWidth <= 480);
    assert(appRule).style.height = `${window.innerHeight}px`;
  };
  resizeListener();
  window.addEventListener("resize", resizeListener);
}

export function initAnimations() {
  if (State.isMobile.value) return;

  const strMap = (str, sep, fn) => String(str).split(sep).map(fn).join(sep);
  const hover = (selectors) => strMap(selectors, ",", (s) => `${s}:hover`);
  const transition = (props = []) => ({
    transition: props.map((p) => `${p} 0.2s`).join(", "),
  });
  const darken = (value) => `hsl(from ${value} h s calc(l - 15))`;

  style(`${header} a, ${header} select, ${footer} a`, transition(["color"]));
  style(hover(`${header} a, ${header} select, ${footer} a`), {
    color: "var(--text)",
  });

  style(hover(`${claim} a, ${resetPassword} a`), {
    color: darken("var(--accent)"),
  });

  style(hover("button, input[type='submit']"), {
    background: darken("var(--accent)"),
  });
}
