import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(15)
  },
  token: {
    type: DataTypes.STRING(255)
  },
  avatar: {
    type: DataTypes.STRING(255)
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: "accounts",
  timestamps: true
})

export default Account;