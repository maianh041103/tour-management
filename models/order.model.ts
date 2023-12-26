import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(500)
  },
  status: {
    type: DataTypes.STRING(20)
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: "orders",
  timestamps: true
})

export default Order;