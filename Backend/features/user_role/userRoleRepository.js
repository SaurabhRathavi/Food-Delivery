const { where } = require("sequelize");
const db = require("../../connection.js");

const createNewUserRole = async (user_uuid, role_uuid) => {
  return await db.UserRole.create({
    user_uuid: user_uuid,
    role_uuid: role_uuid,
  });
};

const getByUserAndRoleUUID = async (user_uuid, role_uuid) => {
  return await db.UserRole.findAll({
    where: { user_uuid: user_uuid, role_uuid: role_uuid },
  });
};

module.exports = { createNewUserRole, getByUserAndRoleUUID };
