const bcrypt = require("bcrypt");

module.exports = (connectDB, DataTypes) => {
  const User = connectDB.define(
    "User",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        required: true,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
      },
      country_code: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
      dob: {
        type: DataTypes.STRING,
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_token_expiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING,
        require: true,
      },
      updated_by: {
        type: DataTypes.STRING,
        require: true,
      },
    },
    {
      timestamps: true,
      tableName: "users",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 6);
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 6);
            }
        },
    }
    }
  );

  return User;
};
