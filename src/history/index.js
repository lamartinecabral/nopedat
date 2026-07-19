// @ts-check
import { elem, style } from "../freedom";
import { NoteHistory } from "../utils";

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
            elem("a", { href: noteUrl(docId) }, docId),
            formatDate(lastAccess),
            elem(
              "button",
              {
                className: "remove",
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

style("*", {
  boxSizing: "border-box",
  fontFamily: '"SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
});
style("body", {
  background: "linear-gradient(135deg, #f6f7f5 0%, #e8eef0 100%)",
  color: "#172422",
  margin: "0",
  minHeight: "100vh",
  padding: "clamp(1.25rem, 5vw, 4rem)",
});
style("h1", {
  fontSize: "1.5rem",
  fontWeight: "700",
  letterSpacing: "0",
  margin: "0 0 1.25rem",
});
style("table", {
  background: "#fffefd",
  border: "1px solid #d6dfda",
  borderCollapse: "separate",
  borderRadius: "8px",
  borderSpacing: "0",
  boxShadow: "0 12px 28px rgba(24, 45, 40, 0.09)",
  margin: "0",
  overflow: "hidden",
  width: "100%",
});
style("td, th", {
  borderBottom: "1px solid #e6ece8",
  padding: "0.875rem 1rem",
});
style("th", {
  background: "#eff4f1",
  color: "#48615a",
  fontSize: "0.75rem",
  fontWeight: "700",
  textAlign: "left",
  textTransform: "uppercase",
});
style("tbody tr:last-child td", { borderBottom: "none" });
style("td:first-child", { fontWeight: "600", overflowWrap: "anywhere" });
style("td:nth-child(2)", { color: "#60736d", fontSize: "0.875rem" });
style("td:last-child, th:last-child", {
  paddingLeft: "0",
  textAlign: "right",
  width: "1%",
});
style("a", { color: "#126b56", textDecoration: "none" });
style("a:hover", { textDecoration: "underline" });
style("a:focus-visible", { borderRadius: "2px", outline: "2px solid #17735d" });
style("button.remove", {
  background: "transparent",
  border: "1px solid #c7d3cd",
  borderRadius: "4px",
  color: "#456159",
  cursor: "pointer",
  fontSize: "0.75rem",
  opacity: "0",
  padding: "0.375rem 0.5rem",
  whiteSpace: "nowrap",
});
style("button.remove:hover", {
  background: "#fff0ee",
  borderColor: "#d28a81",
  color: "#9d3029",
});
style("tr:is(:hover, :has(:focus))", { background: "#f4f9f6" });
style("tr:is(:hover, :has(:focus)) button.remove", { opacity: "1" });
style("button.remove:focus-visible", {
  opacity: "1",
  outline: "2px solid #17735d",
});
style(".touch button.remove", { opacity: "1" });
style(".empty", {
  background: "#fffefd",
  border: "1px dashed #bac9c1",
  borderRadius: "8px",
  color: "#60736d",
  margin: "0",
  padding: "2rem",
  textAlign: "center",
});

if (!matchMedia("(hover: hover)").matches) document.body.classList.add("touch");

function remove(id) {
  if (!confirm(`Remove entry '${id}'?`)) return;
  NoteHistory.remove(id);
  buildList();
}

buildList();
