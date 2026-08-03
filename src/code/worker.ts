importScripts("/js/marked.js");
importScripts("/js/code.boilerplate.js");
importScripts("/assets/babel@7.27.2/babel.min.js");

type Language = keyof typeof import("./model").Languages;
type CodeBoilerplate = (options: {
  language: Language;
  source: string;
}) => string;
type Babel = typeof import("@babel/standalone");

postMessage("codeWorkerReady");

addEventListener("message", (ev) => {
  if ("type" in ev.data && ev.data.type === "codeWorkerMessage") {
    try {
      postMessage({
        type: "codeWorkerMessage",
        value: getParsedCode(ev.data.value),
      });
    } catch (err) {
      console.error(err);
      postMessage({ type: "codeWorkerMessage", value: "" });
    }
  }
});

const getParsedCode = ({
  language,
  source,
}: {
  language: Language;
  source: string;
}) => {
  switch (language) {
    case "html": {
      return codeBoilerplate({ language: "html", source });
    }
    case "javascript": {
      return codeBoilerplate({ language: "javascript", source });
    }
    case "markdown": {
      if (typeof marked === "undefined")
        throw new Error("marked module not imported");
      return codeBoilerplate({
        language: "markdown",
        source: marked.parse(source),
      });
    }
    case "jsx": {
      const { code } = getBabel().transform(source, {
        presets: [
          ["typescript", { allExtensions: true, isTSX: true }],
          "react",
        ],
      });
      return codeBoilerplate({ language: "jsx", source: code ?? "" });
    }
    case "mermaid": {
      return codeBoilerplate({ language: "mermaid", source });
    }
    default: {
      return "";
    }
  }
};

const getBabel = (): Babel => {
  const babel = (self as typeof self & { Babel?: Babel }).Babel;
  if (babel) return babel;
  throw new Error("@babel/standalone module not imported");
};

const codeBoilerplate: CodeBoilerplate = (param) => {
  const boilerplate = (
    self as typeof self & { codeBoilerplate?: CodeBoilerplate }
  ).codeBoilerplate;
  if (boilerplate) return boilerplate(param);
  throw new Error("code.boilerplate module not imported");
};
