const crypto = require("crypto");

const decryptPassword = (privateKey, password) => {
  const buffer = Buffer.from(password, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  const decryptedPassword = decrypted.toString("utf-8");

  return decryptedPassword;
};

module.exports = decryptPassword;
