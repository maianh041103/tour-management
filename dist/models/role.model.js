"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const Role = database_1.default.define("Role", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    permissions: {
        type: sequelize_1.DataTypes.STRING(500)
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "role",
    timestamps: true
});
exports.default = Role;
