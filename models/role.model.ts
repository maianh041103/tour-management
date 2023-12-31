import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
  permissions: {
    type: DataTypes.STRING(500)
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: "role",
  timestamps: true
})

export default Role;