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
exports.deleteItem = exports.editPATCH = exports.edit = exports.detail = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    for (let account of accounts) {
        const role = yield role_model_1.default.findOne({
            where: {
                deleted: false,
                id: account["role_id"]
            },
            raw: true
        });
        account["role"] = role;
    }
    res.render("admin/pages/list-accounts/index.pug", {
        pageTitle: "Danh sách tài khoản",
        accounts: accounts
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_model_1.default.findOne({
        where: {
            id: req.params.id,
            deleted: false
        },
        raw: true
    });
    const role = yield role_model_1.default.findOne({
        where: {
            deleted: false,
            id: account["role_id"]
        },
        raw: true
    });
    account["role"] = role;
    res.render("admin/pages/list-accounts/detail.pug", {
        pageTitle: "Chi tiết tài khoản",
        account: account
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield account_model_1.default.findOne({
        where: {
            id: req.params.id,
            deleted: false
        },
        raw: true
    });
    const roles = yield role_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/list-accounts/edit.pug", {
        pageTitle: "Chỉnh sửa tài khoản",
        user: user,
        roles: roles
    });
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.password);
        if (req.body.password !== "") {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
        yield account_model_1.default.update(req.body, {
            where: {
                id: req.params.id,
                deleted: false
            }
        });
        req["flash"]("success", "Cập nhật thông tin tài khoản thành công");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thông tin tài khoản thất bại");
        res.redirect("back");
    }
});
exports.editPATCH = editPATCH;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield account_model_1.default.update({
            deleted: true,
            deletedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            code: 200,
            message: "Xóa tài khoản thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa tài khoản thất bại"
        });
    }
});
exports.deleteItem = deleteItem;
