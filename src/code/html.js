// @ts-check

import {
  status,
  header,
  password,
  options,
  play,
  backdrop,
  modal,
  optionsModal,
  protectedInput,
  publicInput,
  logout,
  passwordModal,
  claim,
  form,
  email,
  emailInput,
  passwordInput,
  submitButton,
  resetPassword,
  app,
  editor,
  langSelect,
  preview,
  previewButton,
  footer,
} from "./refs";
import { elem } from "../freedom";
import { Languages } from "./model";
import { State } from "./state";

/** @type {import('../codemirror/codemirror')} */
const Editor = window.codemirror;

const elements = [
  elem("main", [
    elem(status, [elem("span", "Loading...")]),
    elem(header, [
      elem(langSelect, { className: "fixed-button" }, [
        ...Object.values(Languages).map(({ label, value }) =>
          elem("option", { value }, label),
        ),
        elem("optgroup", { label: "# editor theme" }, [
          elem(
            "option",
            { value: "theme-light", disabled: !State.nightMode.value },
            "light",
          ),
          elem(
            "option",
            { value: "theme-dark", disabled: State.nightMode.value },
            "dark",
          ),
        ]),
      ]),
      " ",
      elem(
        password,
        { className: "fixed-button", hidden: true, href: "#" },
        "password",
      ),
      elem(
        options,
        { className: "fixed-button", hidden: true, href: "#" },
        "options",
      ),
    ]),
    elem(footer, { hidden: true }, [
      elem(
        play,
        {
          href: "#",
          className: "fixed-button",
          title: "shift+click to toggle a preview frame",
          hidden: !State.isMobile.value,
        },
        "play",
      ),
      elem(
        previewButton,
        {
          href: "#",
          className: "fixed-button",
          title: "click to toggle a preview frame",
          hidden: State.isMobile.value,
        },
        "preview",
      ),
    ]),
    elem(backdrop, { hidden: true }, [
      elem(modal, [
        elem(optionsModal, { hidden: true }, [
          elem("div", [
            elem(protectedInput, {
              type: "checkbox",
            }),
            elem(
              "label",
              { htmlFor: protectedInput.id, title: "Only you can edit" },
              "Protected",
            ),
          ]),
          elem("div", [
            elem(publicInput, { type: "checkbox" }),
            elem(
              "label",
              { htmlFor: publicInput.id, title: "Everyone can read" },
              "Public",
            ),
          ]),
          elem("div", [elem(logout, { className: "action-button" }, "logout")]),
        ]),
        elem(passwordModal, { hidden: true }, [
          elem(claim, { hidden: true }, [
            elem(
              "a",
              {
                href: "#",
                className: "anchor-button",
                title:
                  "If you have an account, you can claim and protect this note",
              },
              "claim this note",
            ),
          ]),
          elem(form, [
            elem("table", [
              elem(email, { hidden: true }, [
                elem("td", [
                  elem("label", { htmlFor: emailInput.id }, " E-mail: "),
                ]),
                elem("td", [
                  elem(emailInput, {
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
            ]),
            elem(submitButton, [
              elem("input", {
                className: "action-button",
                type: "submit",
                value: "Submit",
              }),
            ]),
            elem(resetPassword, { hidden: true }, [
              elem(
                "a",
                { className: "anchor-button", href: "#" },
                "reset password",
              ),
            ]),
          ]),
        ]),
      ]),
    ]),
    elem(editor),
  ]),
  elem(preview),
];

export class Html {
  static get text() {
    return Editor.getValue();
  }
  static set text(text) {
    Editor.setValue(text);
  }
  static setText(text, cursor) {
    Editor.setValue(text, cursor);
  }
  static get cursor() {
    return Editor.getCursor();
  }
}

export function initHtml() {
  document.body.id = app.id;
  app().hidden = true;
  app().className = State.nightMode.value ? "dark" : "light";
  app().append(...elements);
  preview().src = "./preview.html?" + State.docId;
  Editor.initEditor(editor(), { nightMode: State.nightMode.value });
}
