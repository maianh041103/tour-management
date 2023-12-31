"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionPATCH = exports.permission = exports.deleteItem = exports.editPATCH = exports.edit = exports.detail = exports.createPOST = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.findAll({
        where: {
            deleted: false
        }
    });
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        roles: roles
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Tạo mới nhóm quyền"
    });
});
exports.create = create;
const createPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield role_model_1.default.create(req.body);
        req["flash"]("success", "Thêm mới nhóm quyền thành công");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/roles`);
    }
    catch (error) {
        req["flash"]("error", "Thêm mới nhóm quyền thất bại");
    }
});
exports.createPOST = createPOST;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render("admin/pages/roles/detail.pug", {
            pageTitle: "Chi tiết nhóm quyền",
            role: role
        });
    }
    catch (error) {
        res.redirect("back");
        req["flash"]("error", "Không tìm thấy nhóm quyền");
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.findOne({
            where: {
                deleted: false,
                id: req.params.id
            }
        });
        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            role: role
        });
    }
    catch (error) {
        req["flash"]("error", "Không tìm thấy nhóm quyền");
        res.redirect("back");
    }
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield role_model_1.default.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        req["flash"]("success", "Cập nhật nhóm quyền thành công");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật nhóm quyền thất bại");
        res.redirect("back");
    }
});
exports.editPATCH = editPATCH;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield role_model_1.default.update({
            deleted: true,
            deletedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            code: 200,
            message: "Xóa tour thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa tour thất bại"
        });
    }
});
exports.deleteItem = deleteItem;
const permission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.findAll({
        where: {
            deleted: false
        }
    });
    res.render("admin/pages/roles/permission.pug", {
        pageTitle: "Phân quyền",
        roles: roles
    });
});
exports.permission = permission;
const permissionPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPermission = req.body;
        listPermission.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield role_model_1.default.update({
                permissions: JSON.stringify(item.permissions)
            }, {
                where: {
                    id: parseInt(item.id)
                }
            });
        }));
        const roles = yield role_model_1.default.findAll({
            where: {
                deleted: false
            },
            raw: true
        });
        res.json({
            code: 200,
            roles: roles
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400
        });
    }
});
exports.permissionPATCH = permissionPATCH;
