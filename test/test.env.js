// @ts-check
const fs = require("fs");
require("dotenv").config({ quiet: true });

const host = process.env.HOST;
const docId = process.env.TEST_DOC_ID;

const projectName = JSON.parse(fs.readFileSync("../.firebaserc", "utf-8"))
  .projects.default;

if (!docId) throw new Error("TEST_DOC_ID undefined");
if (!projectName)
  throw new Error("You need to adjust project default in .firebaserc");

module.exports = {
  host: host === "remote" ? "remote" : "local",
  docId,
  projectName,
};
