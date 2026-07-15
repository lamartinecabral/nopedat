// @ts-check
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
