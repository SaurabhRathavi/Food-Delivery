const axios = require("axios");
const { JSEncrypt } = require("jsencrypt");

async function encryptPassword(password) {
  try {
    const publicKey = await axios.get(
      `${process.env.VUE_APP_SERVER_ADDRESS}/api/v1/public-key`
    );
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey.data.data);
    return encrypt.encrypt(password);
  } catch (error) {
    console.log(error);
  }
}

module.exports = encryptPassword;
