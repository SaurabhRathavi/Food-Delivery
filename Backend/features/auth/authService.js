const { getUserByEmail } = require("../users/useRepository.js");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utils/signToken.js");
const { getRoleByName } = require("../role/roleRepository.js");
const { getByUserAndRoleUUID } = require("../user_role/userRoleRepository.js");
const fs = require("fs");
const path = require("path");
const getPrivateKey = require("../../utils/getPrivateKey.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const loginUser = async (email, password, role) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw Error("user is not available");
  }

  const userRole = await getRoleByName(role);

  const userRoleAvailable = await getByUserAndRoleUUID(
    user.uuid,
    userRole.uuid
  );

  if (userRoleAvailable.length == 0) {
    throw Error("User is not available with this role");
  }
  const privateKey = getPrivateKey();
  const decryptedPassword = decryptPassword(privateKey, password);
  password = decryptedPassword;
  
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error("pls enter correct password");
  }

  const jwtToken = signToken(user.first_name, user.email);
  
  //  const {first_name,last_name,email}=user.dataValues;
  //  const userData={first_name,last_name,email}
  return { user, jwtToken };
};

module.exports = { loginUser };
