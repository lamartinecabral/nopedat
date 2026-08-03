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
import { baseStyle, buttonStyle, darkTheme, lightTheme, vars } from "../theme";

export function initCss() {
  baseStyle();
  buttonStyle();
  lightTheme();
  darkTheme();
  style(app, {
    minHeight: "100vh",
    margin: "0",
    padding: "0",
    background: vars.mainBg,
    color: vars.text,
  });
  style("input", {
    color: vars.text,
    background: vars.bg,
    border: `1px solid ${vars.color}`,
    borderRadius: "2px",
    font: "inherit",
  });
  style("input[type='text'], input[type='password']", {
    width: "100%",
    padding: "0.4rem 0.5rem",
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
  style(`${docList} td`, {
    borderTop: `1px solid ${vars.color}`,
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
  style(".textcenter", {
    textAlign: "center",
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
    color: vars.color,
  });
  style(".center", {
    width: "min(calc(100% - 24px), 430px)",
    margin: "12vh auto 0",
    padding: "2em",
    background: vars.bg,
    border: `1px solid ${vars.color}`,
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
  style(loginContainer, {
    color: vars.text,
  });
  style(content, {
    minHeight: "100vh",
    padding: "12px",
  });
  style(userEmail, {
    color: vars.color,
  });
  style(message, {
    margin: "12px 0",
    padding: "0.75rem",
    background: vars.bg,
    border: `1px solid ${vars.color}`,
    borderRadius: "4px",
  });
  style(docList, {
    background: vars.bg,
    border: `1px solid ${vars.color}`,
    borderRadius: "4px",
    overflow: "auto",
  });
  style(`${docList} tr:nth-child(2n)`, {
    background: vars.mainBg,
  });

  style(docGrid, {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  });
  style(`${docGrid} > div`, {
    padding: "0.75rem",
    background: vars.bg,
    border: `1px solid ${vars.color}`,
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
    background: vars.bg,
    color: vars.accent,
    border: `1px solid ${vars.color}`,
    borderRadius: "2px",
    cursor: "pointer",
  });
  style(`${docGrid} div.header button.active`, {
    background: vars.accent,
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
    color: vars.text,
    background: vars.bg,
    border: `1px solid ${vars.color}`,
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
    color: vars.text,
    background: vars.mainBg,
    border: `1px solid ${vars.color}`,
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
