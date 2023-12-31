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
exports.changePasswordPATCH = exports.changePassword = exports.editPATCH = exports.edit = exports.info = exports.logout = exports.loginPOST = exports.login = exports.regiterPOST = exports.register = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const system_1 = require("../../config/system");
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helper/generate.helper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/register.pug", {
        pageTitle: "Đăng ký tài khoản"
    });
});
exports.register = register;
const regiterPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const emailExists = yield account_model_1.default.findOne({
        where: {
            email: email,
            deleted: false
        }
    });
    if (!emailExists) {
        req.body["password"] = (0, md5_1.default)(req.body["password"]);
        req.body["token"] = (0, generate_helper_1.generateToken)(20);
        yield account_model_1.default.create(req.body);
        res.redirect(`${system_1.systemConfig.prefixAdmin}/login`);
    }
    else {
        req["flash"]("error", "Email đã tồn tại");
        res.redirect("back");
    }
});
exports.regiterPOST = regiterPOST;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('admin/pages/accounts/login.pug', {
        pageTitle: "Đăng nhập"
    });
});
exports.login = login;
const loginPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield account_model_1.default.findOne({
        where: {
            email: req.body.email,
            deleted: false
        },
        raw: true
    });
    if (!emailExist) {
        req["flash"]("error", "Email không tồn tại");
        res.redirect("back");
    }
    else {
        if (emailExist["password"] === (0, md5_1.default)(req.body.password)) {
            res["cookie"]("token", emailExist["token"]);
            res.redirect(`${system_1.systemConfig.prefixAdmin}/dashboard`);
        }
        else {
            req["flash"]("error", "Mật khẩu không chính xác");
            res.redirect("back");
        }
    }
});
exports.loginPOST = loginPOST;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.redirect(`${system_1.systemConfig.prefixAdmin}/login`);
});
exports.logout = logout;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/info.pug", {
        pageTitle: "Thông tin tài khoản"
    });
});
exports.info = info;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "Sửa thông tin cá nhân"
    });
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield account_model_1.default.update(req.body, {
            where: {
                deleted: false,
                id: res.locals.account.id
            }
        });
        req["flash"]("success", "Đổi thông tin thành công");
        res.redirect("back");
    }
    catch (error) {
        console.log(error);
        req["flash"]("error", "Đổi thông tin thất bại");
        res.redirect("back");
    }
});
exports.editPATCH = editPATCH;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/change-password", {
        pageTitle: "Đổi mật khẩu"
    });
});
exports.changePassword = changePassword;
const changePasswordPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        if ((0, md5_1.default)(oldPassword) == res.locals.account.password) {
            yield account_model_1.default.update({
                password: (0, md5_1.default)(newPassword)
            }, {
                where: {
                    id: res.locals.account.id
                }
            });
            req["flash"]("success", "Đổi mật khấu thành công");
        }
        else {
            req["flash"]("error", "Mật khẩu cũ không chính xác");
        }
        res.redirect("back");
    }
    catch (error) {
        console.log(error);
        req["flash"]("error", "Đổi mật khẩu thất bại");
        res.redirect("back");
    }
});
exports.changePasswordPATCH = changePasswordPATCH;
