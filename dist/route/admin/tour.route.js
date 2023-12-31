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
exports.TourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../../controller/admin/tour.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const uploadToClound = __importStar(require("../../middlerware/admin/upload.middlerware"));
const route = express_1.default.Router();
route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create", upload.fields([{ name: 'images', maxCount: 10 }]), uploadToClound.uploadFields, controller.createPOST);
route.patch("/change-status", controller.changeStatus);
route.get("/detail/:id", controller.detail);
route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", upload.fields([{ name: 'images', maxCount: 10 }]), uploadToClound.uploadFields, controller.editPATCH);
route.delete("/delete/:id", controller.deleteItem);
exports.TourRoutes = route;
