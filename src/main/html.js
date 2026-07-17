// @ts-check

import {
  status,
  header,
  theme,
  password,
  options,
  github,
  footer,
  markdown,
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
  textarea,
  app,
  code,
} from "./refs";
import { elem } from "../freedom";
import { State } from "./state";
import { Cache } from "../cache";

const elements = [
  elem(status, [elem("span", "Loading...")]),
  elem(header, [
    elem("span", [elem(theme, { href: "#", title: "Toggle theme" }, "dark")]),
    " ",
    elem("span", [
      elem(
        password,
        { href: "#", hidden: true, title: "Enter or add a password" },
        "password",
      ),
    ]),
    elem("span", [
      elem(
        options,
        { href: "#", hidden: true, title: "View options" },
        "options",
      ),
    ]),
  ]),
  elem(github, [
    elem("a", {
      href: "https://github.com/lamartinecabral/nopedat",
      title: "Visit GitHub repository",
      innerHTML: ghSvg(),
    }),
  ]),
  elem(footer, { hidden: true }, [
    elem("span", [
      elem(code, {
        href: "#",
        title: "Go to code editor",
        innerHTML: codeSvg(),
      }),
    ]),
    " ",
    elem("span", [
      elem(markdown, {
        href: "#",
        title: "View note as markdown",
        innerHTML: mdSvg(),
      }),
    ]),
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
        elem("div", [elem(logout, "logout")]),
      ]),
      elem(passwordModal, { hidden: true }, [
        elem(claim, { hidden: true }, [
          elem(
            "a",
            {
              href: "#",
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
            elem("input", { type: "submit", value: "Submit" }),
          ]),
          elem(resetPassword, { hidden: true }, [
            elem("a", { href: "#" }, "reset password"),
          ]),
        ]),
      ]),
    ]),
  ]),
  // @ts-ignore
  elem(textarea, {
    placeholder: "Type your note here...",
    autofocus: true,
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    spellcheck: false,
    hidden: true,
  }),
];

export class Html {
  static get text() {
    return textarea().value;
  }
  static set text(text) {
    const ta = textarea();
    const selectionStart = ta.selectionStart;
    const selectionEnd = ta.selectionEnd;
    ta.value = text;
    if (State.isLogged.value) Cache.setText(text);
    ta.selectionStart = selectionStart;
    ta.selectionEnd = selectionEnd;
  }
}

function ghSvg() {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11.95" fill="#ffffff" /><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
}

function mdSvg() {
  return `<svg viewBox="5 9 15 6.5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 15.5H5v-7h2l2 2 2-2h2v7h-2v-4l-2 2-2-2v4zm11-3h2l-3 3-3-3h2v-4h2v4z"/></svg>`;
}

function codeSvg() {
  return `<svg viewBox="4 8.5 16 7" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12z"/><path fill="currentColor" d="M11.78 15.54H9.65l2.57-7.08h2.13z"/><path fill="currentColor" d="M20 12l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12z"/></svg>`;
}

export function initHtml() {
  document.body.id = app.id;
  app().hidden = true;
  app().className = "light";
  for (const element of elements) app().appendChild(element);
}
