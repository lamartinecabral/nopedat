// @ts-check
const cp = require("child_process");
const fs = require("fs");
const pkg = require("../package.json");

const run = () => {
  const htmlFiles = cp
    .execSync('find dist -name "*.html"')
    .toString()
    .trim()
    .split("\n");

  const freedomVersion = pkg.devDependencies["@lamartinecabral/freedom"];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file).toString();
    const result = content.replace(
      /@lamartinecabral\/freedom@\d+\.\d+\.\d+/g,
      "@lamartinecabral/freedom@" + freedomVersion,
    );
    if (result !== content) fs.writeFileSync(file, result);
  }
};

run();
