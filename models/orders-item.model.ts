import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER
  },
  timeStart: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "orders_item",
  timestamps: false
})

export default OrderItem;