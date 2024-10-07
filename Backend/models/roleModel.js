module.exports = (connectDB, DataTypes) => {
  const Role = connectDB.define(
    "Role",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "roles",
    }
  );
  return Role;
};
