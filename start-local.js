const fs = require("fs");
const path = require("path");

const serverPath = path.join(__dirname, "local-server.js");
const serverCode = fs.readFileSync(serverPath, "utf8");

new Function("require", "__dirname", "console", "process", serverCode)(require, __dirname, console, process);
