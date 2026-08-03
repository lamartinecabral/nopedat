const webpack = require("webpack");

require("dotenv").config({ quiet: true });

const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;

if (!FIREBASE_CONFIG) {
  throw new Error("FIREBASE_CONFIG environment variable is not set");
}

const entries = {
  entry: {
    "js/account": "./src/account/index.js",
    "js/secret": "./src/secret/index.js",
    "js/markdown": "./src/markdown/index.js",
    "js/marked": "./src/marked/index.js",
    "js/html": "./src/html/index.js",
    "js/code": "./src/code/index.js",
    "js/code.worker": "./src/code/worker.js",
    "js/code.boilerplate": "./src/code/boilerplate.js",
    "js/qrcode": "./src/qrcode/index.js",
    "js/history": "./src/history/index.js",
    "js/codemirror": "./src/codemirror/index.js",
    "js/firebase": "./src/firebase/index.js",
    "js/download": "./src/download/index.js",
    "js/mermaid": "./src/mermaid/index.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FIREBASE_CONFIG": JSON.stringify(FIREBASE_CONFIG),
    }),
  ],
};

const es5Entries = {
  entry: {
    "js/main": "./src/main/index.ts",
    "js/firebase8": "./src/firebase8/index.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FIREBASE_CONFIG": JSON.stringify(FIREBASE_CONFIG),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[mc]?[jt]s$/,
        use: "ts-loader",
      },
    ],
  },
  target: ["es5", "web"],
};

module.exports = [entries, es5Entries];
