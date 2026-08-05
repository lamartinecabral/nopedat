import { style } from "./freedom";

export const supportCssVar = !!window.CSS?.supports?.("color: var(--x)");

export const vars = supportCssVar
  ? {
      color: "var(--color)",
      accent: "var(--accent)",
      bg: "var(--bg)",
      mainBg: "var(--main-bg)",
      text: "var(--text)",
    }
  : {
      mainBg: "#edf2fa",
      bg: "#ffffff",
      color: "#81a7e4",
      accent: "#0957d0",
      text: "#474747",
    };

export const darkTheme = () => {
  return style(".dark", {
    "--main-bg": "#1f2020",
    "--bg": "#282828",
    "--color": "#606060",
    "--accent": "#3a8dc5",
    "--text": "#fff",
  });
};

export const lightTheme = () => {
  return style(".light", {
    "--main-bg": "#edf2fa",
    "--bg": "#ffffff",
    "--color": "#81a7e4",
    "--accent": "#0957d0",
    "--text": "#474747",
  });
};

export const buttonStyle = () => {
  return [
    style(".fixed-button", {
      textDecoration: "none",
      border: "1px solid",
      borderRadius: "2px",
      padding: "0 2px",
      cursor: "pointer",
      background: vars.bg,
      color: vars.color,
      transition: "color 0.2s",
    }),
    style(".fixed-button:hover", { color: vars.text }),

    style(".action-button", {
      padding: "0.5rem 1rem",
      cursor: "pointer",
      background: vars.accent,
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontFamily: "inherit",
      fontSize: "inherit",
      transition: "background 0.2s",
      outlineColor: "#fff",
    }),
    style(".action-button:hover", {
      background: `hsl(from ${vars.accent} h s calc(l - 15))`,
    }),

    style(".anchor-button", {
      textDecoration: "underline",
      color: vars.accent,
      cursor: "pointer",
      transition: "color 0.2s",
    }),
    style(".anchor-button:hover", {
      color: `hsl(from ${vars.accent} h s calc(l - 15))`,
    }),
  ];
};

export const baseStyle = () => {
  return [
    style(":root", {
      fontSize: "16px",
    }),
    style("*", {
      fontFamily: "Menlo, monospace",
      boxSizing: "border-box",
      accentColor: vars.accent,
      outlineColor: vars.accent,
    }),
  ];
};
