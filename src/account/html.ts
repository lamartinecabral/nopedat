import { trunc } from "../utils";
import { Control } from "./control";
import {
  loginContainer,
  loginForm,
  usernameInput,
  passwordInput,
  password2,
  passwordInput2,
  loginSubmit,
  signinMode,
  signupMode,
  resetPassword,
  content,
  userEmail,
  docList,
  docGrid,
  message,
  claimButton,
  changeLayout,
  logout,
  app,
} from "./refs";
import { elem, getElem } from "../freedom";
import { State } from "./state";

const elements = [
  elem(loginContainer, { className: "center", hidden: true }, [
    elem(loginForm, [
      elem("table", [
        elem("tr", [
          elem("td", [
            elem("label", { htmlFor: usernameInput.id }, " E-mail: "),
          ]),
          elem("td", [
            elem(usernameInput, {
              type: "text",
              name: "email",
              autocomplete: "email",
            }),
          ]),
        ]),
        elem("tr", [
          elem("td", [
            elem("label", { htmlFor: passwordInput.id }, " Password: "),
          ]),
          elem("td", [
            elem(passwordInput, {
              type: "password",
              name: "password",
            }),
          ]),
        ]),
        elem(password2, { hidden: true }, [
          elem("td", [
            elem("label", { htmlFor: passwordInput2.id }, [
              " Repeat the",
              elem("br"),
              "password: ",
            ]),
          ]),
          elem("td", [
            elem(passwordInput2, {
              type: "password",
            }),
          ]),
        ]),
      ]),
      elem("div", { className: "margin textcenter" }, [
        elem(loginSubmit, {
          className: "action-button",
          type: "submit",
          value: "Login",
        }),
      ]),
    ]),
    elem("div", { className: "margin textcenter", hidden: true }, [
      elem(signinMode, { className: "anchor-button", href: "#" }, "Log in"),
    ]),
    elem("div", { className: "margin textcenter" }, [
      elem(
        signupMode,
        { className: "anchor-button", href: "#" },
        "create account",
      ),
    ]),
    elem("div", { className: "margin textcenter" }, [
      elem(
        resetPassword,
        { className: "anchor-button", href: "#" },
        "reset password",
      ),
    ]),
  ]),
  elem(content, { hidden: true }, [
    elem("div", { className: "nav margin" }, [
      elem(userEmail),
      elem(logout, { className: "action-button" }, "logout"),
      elem(claimButton, { className: "action-button" }, "claim"),
      elem(changeLayout, { className: "action-button" }, "layout"),
    ]),
    elem(message, { className: "margin" }, "Loading..."),
    elem(docGrid),
    elem(docList, { className: "margin" }, [
      elem("table", [
        elem("tr", [
          elem("th", "Note ID"),
          elem("th", { title: "Only you can edit" }, "Protected"),
          elem("th", { title: "Everyone can read" }, "Public"),
          elem("th", "Ownership"),
        ]),
      ]),
    ]),
  ]),
];

/** @param {import("./state").Doc} doc */
export function docGridElem(doc) {
  let optMode = false;
  const optClick = (ev) => {
    optMode = !optMode;
    ev.target.classList.toggle("active", optMode);
    getElem("ta_" + doc.id).hidden = optMode;
    getElem("to_" + doc.id).hidden = !optMode;
  };
  return elem("div", { id: "tr_" + doc.id }, [
    elem("div", { className: "header" }, [
      elem(
        "a",
        {
          href: location.origin + "/?" + doc.id,
          target: "_blank",
          className: "docname anchor-button",
          title: doc.id,
        },
        doc.id,
      ),
      elem(
        "button",
        { className: optMode ? "active" : "", onclick: optClick },
        "⚙️",
      ),
    ]),
    elem("div", { className: "textarea" }, [
      elem(
        "textarea",
        {
          id: "ta_" + doc.id,
          readOnly: true,
          hidden: optMode,
        },
        [doc.text],
      ),
      elem("div", { id: "to_" + doc.id, hidden: !optMode }, [
        elem("div", [
          elem("div", [
            elem("div", { className: "checkboxContainer" }, [
              elem("input", {
                id: "cbprot_" + doc.id,
                type: "checkbox",
                checked: !!doc.protected,
                onchange: (ev: Event) => {
                  Control.setProtected(
                    doc.id,
                    (ev.target as HTMLInputElement).checked,
                  );
                },
              }),
              "protected",
            ]),
            elem("div", { className: "checkboxContainer" }, [
              elem("input", {
                id: "cbpubl_" + doc.id,
                type: "checkbox",
                disabled: !doc.protected,
                checked: !!doc.public,
                onchange: (ev: Event) => {
                  Control.setPublic(
                    doc.id,
                    (ev.target as HTMLInputElement).checked,
                  );
                },
              }),
              "public",
            ]),
          ]),
          elem(
            "button",
            {
              id: "bt_" + doc.id,
              disabled: !!doc.protected,
              onclick: () => Control.removeDoc(doc),
              className: "margin action-button",
            },
            "drop",
          ),
        ]),
      ]),
    ]),
  ]);
}

/** @param {import("./state").Doc} doc */
export function docListElem(doc) {
  return elem("tr", { id: "tr_" + doc.id }, [
    elem("td", [
      elem(
        "a",
        {
          id: "a_" + doc.id,
          href: location.origin + "/?" + doc.id,
          target: "_blank",
          title: trunc(doc.text, 280),
          className: "anchor-button",
        },
        doc.id,
      ),
    ]),
    elem("td", { className: "checkbox" }, [
      elem("input", {
        id: "cbprot_" + doc.id,
        type: "checkbox",
        checked: !!doc.protected,
        onchange: (ev: Event) => {
          Control.setProtected(doc.id, (ev.target as HTMLInputElement).checked);
        },
      }),
    ]),
    elem("td", { className: "checkbox" }, [
      elem("input", {
        id: "cbpubl_" + doc.id,
        type: "checkbox",
        disabled: !doc.protected,
        checked: !!doc.public,
        onchange: (ev: Event) => {
          Control.setPublic(doc.id, (ev.target as HTMLInputElement).checked);
        },
      }),
    ]),
    elem("td", { className: "checkbox" }, [
      elem(
        "button",
        {
          id: "bt_" + doc.id,
          disabled: !!doc.protected,
          onclick: () => Control.removeDoc(doc),
          className: "action-button",
        },
        "drop",
      ),
    ]),
  ]);
}

export function initHtml() {
  document.body.id = app.id;
  app().className = State.nightMode.value ? "dark" : "light";
  for (const element of elements) app().appendChild(element);
}
