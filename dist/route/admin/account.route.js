"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../../controller/admin/account.controller"));
const auth_middlerware_1 = require("../../middlerware/admin/auth.middlerware");
const multer_1 = __importDefault(require("multer"));
const uploadToClound = __importStar(require("../../middlerware/admin/upload.middlerware"));
const upload = (0, multer_1.default)();
const route = express_1.default.Router();
route.get('/register', controller.register);
route.post('/register', controller.regiterPOST);
route.get("/login", controller.login);
route.post("/login", controller.loginPOST);
route.get("/logout", controller.logout);
route.get("/info", auth_middlerware_1.auth, controller.info);
route.get("/edit", auth_middlerware_1.auth, controller.edit);
route.patch("/edit", auth_middlerware_1.auth, upload.single("avatar"), uploadToClound.uploadSingle, controller.editPATCH);
route.get("/change-password", auth_middlerware_1.auth, controller.changePassword);
route.patch("/change-password", auth_middlerware_1.auth, controller.changePasswordPATCH);
exports.AccountRoutes = route;
