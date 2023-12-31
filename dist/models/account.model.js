"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const Account = database_1.default.define("Account", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15)
    },
    token: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 2
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "accounts",
    timestamps: true
});
exports.default = Account;
