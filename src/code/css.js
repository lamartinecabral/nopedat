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
import { vars, darkTheme, lightTheme } from "../theme";

export function initCss() {
  style("*", {
    fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
    boxSizing: "border-box",
    accentColor: vars.accent,
    outlineColor: vars.accent,
  });
  style("label", {
    color: vars.text,
  });
  const appRule = style(app, {
    display: "flex",
    margin: "0",
    background: vars.mainBg,
    color: vars.color,
    height: "100vh",
  });
  style("main", {
    height: "calc(100% - 24px)",
    width: "calc(100% - 24px)",
    margin: "12px",
  });
  style(editor, {
    height: "100%",
    scrollbarColor: `${vars.color} transparent`,
    color: vars.text,
    background: vars.bg,
    border: `1px solid ${vars.color}`,
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
    background: vars.bg,
    color: vars.color,
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
      background: vars.bg,
      color: vars.color,
    },
  );
  style(`${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    color: vars.accent,
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
  style(`${claim} a, ${resetPassword} a`, {
    textDecoration: "underline",
    color: vars.accent,
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
    background: vars.accent,
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
    color: vars.color,
    background: vars.bg,
  });
  lightTheme();
  darkTheme();
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
    backgroundColor: vars.bg,
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
    color: vars.text,
  });

  style(hover(`${claim} a, ${resetPassword} a`), {
    color: darken(vars.accent),
  });

  style(hover("button, input[type='submit']"), {
    background: darken(vars.accent),
  });
}
