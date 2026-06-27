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
import { setGithubIconColor } from "./css";

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
    elem(
      "a",
      {
        href: "https://github.com/lamartinecabral/nopedat",
        title: "Visit GitHub repository",
      },
      [
        elem("object", {
          data: "./assets/gh.svg",
          type: "image/svg+xml",
          onload: setGithubIconColor,
        }),
      ],
    ),
  ]),
  elem(footer, { hidden: true }, [
    elem("span", [
      elem(code, { href: "#", title: "Go to code editor" }, "</>"),
    ]),
    " ",
    elem("span", [
      elem(
        markdown,
        {
          href: "#",
          style: { paddingLeft: "4px" },
          title: "View note as markdown",
        },
        [
          "M",
          elem(
            "span",
            { style: { fontSize: "1.35rem", lineHeight: "0" } },
            "↓",
          ),
        ],
      ),
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

export function initHtml() {
  document.body.id = app.id;
  app().hidden = true;
  app().className = "light";
  for (const element of elements) app().appendChild(element);
}
