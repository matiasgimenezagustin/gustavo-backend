const fs = require("fs");

const readArchive = async (path) => await fs.promises.readFile(path, "utf-8").then(res => JSON.parse(res));

const saveArchive = async (path, data) => await fs.promises.writeFile(path, JSON.stringify(data), "utf-8");

module.exports = { readArchive, saveArchive };
