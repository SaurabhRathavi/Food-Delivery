const path = require("path");
const fs = require("fs");

const getPublicKey = () => {
  const filePath = path.join(__dirname + "../../publicKey.pem");
  const publicKey = fs.readFileSync(filePath, "utf-8");

  return publicKey;
};

module.exports = getPublicKey;
