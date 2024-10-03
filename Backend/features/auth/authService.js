const { getUserByEmail } = require("../users/useRepository.js");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utils/signToken.js");
const { getRoleByName } = require("../role/roleRepository.js");
const { getByUserAndRoleUUID } = require("../user_role/userRoleRepository.js");

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

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error("pls enter correct password");
  }

  const jwtToken = signToken(user.first_name, user.email);

  return jwtToken;
};

module.exports = { loginUser };
