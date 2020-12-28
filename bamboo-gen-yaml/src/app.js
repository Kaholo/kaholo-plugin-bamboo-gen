const BambooYml = require("./bamboo-yml");
const { writeFile } = require("fs");

async function createYml(action) {
  const results = action.params.results;
  const yml = new BambooYml(results);
  const yamlString = yml.toString();

  if (action.params.outputPath) {
    await new Promise((resolve, reject) => {
      writeFile(
        action.params.outputPath,
        yamlString,
        { encoding: "utf-8" },
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  return yamlString;
}

module.exports = {
  createYml,
};