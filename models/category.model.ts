import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  }, image: {
    type: DataTypes.STRING(500),
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
  status: {
    type: DataTypes.STRING(20),
  },
  position: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Đặt giá trị mặc định là false
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: "categories",
  timestamps: true
});

export default Category;