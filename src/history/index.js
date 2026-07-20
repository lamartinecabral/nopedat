// @ts-check
import { elem, style } from "../freedom";
import { NoteHistory } from "../utils";
import { baseStyle, buttonStyle, darkTheme, lightTheme, vars } from "../theme";
import { Cache } from "../cache";

const buildList = () => {
  document.body.replaceChildren();

  const list = Object.entries(NoteHistory.entries)
    .map(([id, lastAccess]) => ({ id, lastAccess }))
    .sort((a, b) => String(b.lastAccess).localeCompare(String(a.lastAccess)));

  const heading = elem("h1", "History");
  const content = list.length
    ? buildTable(list)
    : elem("p", { className: "empty" }, "No recently opened notes.");

  document.body.append(heading, content);
};

/** @param {{ id: string, lastAccess: string }[]} list */
const buildTable = (list) =>
  elem("table", [
    elem("thead", [
      elem(
        "tr",
        ["Note", "Last opened", ""].map((label) => elem("th", label)),
      ),
    ]),
    elem(
      "tbody",
      list.map(({ id: docId, lastAccess }) =>
        elem(
          "tr",
          [
            elem(
              "a",
              { className: "anchor-button", href: noteUrl(docId) },
              docId,
            ),
            formatDate(lastAccess),
            elem(
              "button",
              {
                className: "remove action-button",
                onclick: () => remove(docId),
                title: `Remove ${docId} from history`,
              },
              "Remove",
            ),
          ].map((cell) => elem("td", [cell])),
        ),
      ),
    ),
  ]);

/** @param {string} id */
const noteUrl = (id) => `${location.origin}/?${encodeURIComponent(id)}`;

/** @param {string} value */
const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
};

baseStyle();
buttonStyle();
lightTheme();
darkTheme();
style("body", {
  background: vars.mainBg,
  color: vars.text,
  margin: "0",
  minHeight: "100vh",
  padding: "12px",
});
style("h1", {
  fontSize: "1.5rem",
  fontWeight: "700",
  letterSpacing: "0",
  margin: "1rem",
});
style("table", {
  background: vars.bg,
  border: `1px solid ${vars.color}`,
  borderSpacing: "0",
  borderRadius: "4px",
  margin: "1rem",
  overflow: "hidden",
});
style("td, th", {
  padding: "0.5rem",
});
style("td", {
  borderTop: `1px solid ${vars.color}`,
});
style("th", {
  color: vars.text,
  textAlign: "left",
});
style("tbody tr:last-child td", { borderBottom: "none" });
style("td:first-child", { fontWeight: "600", overflowWrap: "anywhere" });
style("td:nth-child(2)", { color: vars.color, fontSize: "0.875rem" });
style("td:last-child, th:last-child", {
  paddingLeft: "0",
  textAlign: "right",
  width: "1%",
});
style("a:focus-visible", {
  borderRadius: "2px",
  outline: `2px solid ${vars.accent}`,
});
style("button.remove", {
  padding: "0.25rem 0.5rem",
  cursor: "pointer",
  fontSize: "0.75rem",
  opacity: "0",
  whiteSpace: "nowrap",
});
style("button.remove:hover", {
  background: `hsl(from ${vars.accent} h s calc(l - 15))`,
});
style("tr:is(:hover, :has(:focus))", { background: vars.mainBg });
style("tr:is(:hover, :has(:focus)) button.remove", { opacity: "1" });
style("button.remove:focus-visible", {
  opacity: "1",
  outline: `2px solid ${vars.accent}`,
});
style(".touch button.remove", { opacity: "1" });
style(".empty", {
  background: vars.bg,
  border: `1px solid ${vars.color}`,
  borderRadius: "4px",
  color: vars.text,
  margin: "0",
  padding: "2rem",
  textAlign: "center",
});

document.body.className = Cache.getNightMode(
  window.matchMedia?.("(prefers-color-scheme: dark)").matches,
)
  ? "dark"
  : "light";
if (!matchMedia("(hover: hover)").matches) document.body.classList.add("touch");

function remove(id) {
  if (!confirm(`Remove entry '${id}'?`)) return;
  NoteHistory.remove(id);
  buildList();
}

buildList();
