const axios=require('axios')
const {JSEncrypt}=require('jsencrypt')

async function encryptPassword(password){
    try{
     const publicKey=await axios.get("http://192.1.200.168:5000/api/v1/public-key");
     const encrypt=new JSEncrypt();
     encrypt.setPublicKey(publicKey.data.data);
     return encrypt.encrypt(password);
    }
    catch(error){
       console.log(error);
    }
  }

  module.exports=encryptPassword