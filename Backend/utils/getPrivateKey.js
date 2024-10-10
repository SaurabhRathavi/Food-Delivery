const path = require("path");
const fs = require("fs");

const getPrivateKey = () => {
  const filePath = path.join(__dirname + "../../privateKey.pem");
  const privateKey = fs.readFileSync(filePath, "utf-8");

  return privateKey;
};

module.exports = getPrivateKey;
