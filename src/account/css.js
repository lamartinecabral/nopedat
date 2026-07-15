// @ts-check

import { style } from "../freedom";
import {
  app,
  loginContainer,
  content,
  userEmail,
  docGrid,
  docList,
  message,
} from "./refs";

export function initCss() {
  style("*", {
    fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
    boxSizing: "border-box",
    accentColor: "var(--accent)",
    outlineColor: "var(--accent)",
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
  style(app, {
    minHeight: "100vh",
    margin: "0",
    padding: "0",
    background: "var(--main-bg)",
    color: "var(--text)",
  });
  style("input", {
    color: "var(--text)",
    background: "var(--bg)",
    border: "1px solid var(--color)",
    borderRadius: "2px",
    font: "inherit",
  });
  style("input[type='text'], input[type='password']", {
    width: "100%",
    padding: "0.4rem 0.5rem",
  });
  style("button, input[type='submit']", {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    font: "inherit",
  });
  style("button:disabled", {
    cursor: "not-allowed",
    opacity: "0.5",
  });
  style("th", {
    minWidth: "9ch",
  });
  style("th, td", {
    padding: "0.5rem",
  });
  style("td", {
    borderTop: "1px solid var(--color)",
  });
  style("table", {
    width: "100%",
    borderCollapse: "collapse",
  });
  style("tr > td:first-child", {
    textAlign: "start",
  });
  style(".margin", {
    margin: "1em",
  });
  style(".nav", {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    alignItems: "center",
    minHeight: "36px",
  });
  style(".nav > div", {
    marginRight: "auto",
    color: "var(--color)",
  });
  style(".center", {
    width: "min(calc(100% - 24px), 360px)",
    margin: "12vh auto 0",
    padding: "2em",
    background: "var(--bg)",
    border: "1px solid var(--color)",
    borderRadius: "4px",
  });
  style("td.checkbox", {
    textAlign: "center",
  });
  style(".checkboxContainer", {
    display: "flex",
    alignItems: "center",
    gap: "3px",
  });
  style("a, a:visited", {
    color: "var(--accent)",
  });
  style(loginContainer, {
    color: "var(--text)",
  });
  style(content, {
    minHeight: "100vh",
    padding: "12px",
  });
  style(userEmail, {
    color: "var(--color)",
  });
  style(message, {
    margin: "12px 0",
    padding: "0.75rem",
    background: "var(--bg)",
    border: "1px solid var(--color)",
    borderRadius: "4px",
  });
  style(docList, {
    background: "var(--bg)",
    border: "1px solid var(--color)",
    borderRadius: "4px",
    overflow: "auto",
  });
  style(`${docList} tr:nth-child(2n)`, {
    background: "var(--main-bg)",
  });

  style(docGrid, {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  });
  style(`${docGrid} > div`, {
    padding: "0.75rem",
    background: "var(--bg)",
    border: "1px solid var(--color)",
    borderRadius: "4px",
    minWidth: "0",
  });
  style(`${docGrid} div.header`, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  });
  style(`${docGrid} div.header button`, {
    padding: "0.25rem 0.5rem",
    background: "var(--bg)",
    color: "var(--accent)",
    border: "1px solid var(--color)",
    borderRadius: "2px",
    cursor: "pointer",
  });
  style(`${docGrid} div.header button.active`, {
    background: "var(--accent)",
    color: "#fff",
  });
  style(`${docGrid} a.docname`, {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });
  style(`${docGrid} div.textarea`, {
    display: "flex",
    height: "200px",
  });
  style(`${docGrid} div.textarea textarea`, {
    color: "var(--text)",
    background: "#f7f9fc",
    border: "1px solid var(--color)",
    borderRadius: "2px",
    resize: "none",
    whiteSpace: "pre",
    width: "100%",
    overflow: "hidden",
  });
  style(`${docGrid} div.textarea > textarea:focus`, {
    overflow: "scroll",
  });
  style(`${docGrid} div.textarea > div`, {
    color: "var(--text)",
    background: "#f7f9fc",
    border: "1px solid var(--color)",
    borderRadius: "2px",
    width: "100%",
  });
  style(`${docGrid} div.textarea > div > div`, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  });
}
