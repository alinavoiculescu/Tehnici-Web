const fs = require("fs");

module.exports.readJSONFile = () => {
    return JSON.parse(fs.readFileSync("db.json"))["shops"];
  }

module.exports.writeJSONFile = (content) => {
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ shops: content }, null, 4),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }