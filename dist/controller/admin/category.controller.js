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
exports.changeStatus = exports.deleteItem = exports.editPATCH = exports.edit = exports.detail = exports.createPOST = exports.create = exports.index = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/categories/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        categories: categories
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/categories/create.pug", {
        pageTitle: "Thêm mới danh mục"
    });
});
exports.create = create;
const createPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (data.position) {
        data.position = parseInt(data.position);
    }
    else {
        const count = yield category_model_1.default.count({
            where: {
                deleted: false
            }
        });
        data.position = count + 1;
    }
    let category = {
        title: data.title,
        image: data.image,
        description: data.description,
        status: data.status,
        position: data.position
    };
    yield category_model_1.default.create(category);
    res.redirect(`${system_1.systemConfig.prefixAdmin}/categories`);
});
exports.createPOST = createPOST;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const category = yield category_model_1.default.findOne({
        where: {
            id: categoryId,
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/categories/detail.pug", {
        pageTitle: "Chi tiết danh mục",
        category: category
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const category = yield category_model_1.default.findOne({
        where: {
            id: categoryId,
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/categories/edit.pug", {
        pageTitle: "Chỉnh sửa danh mục",
        category: category
    });
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_model_1.default.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.redirect("back");
});
exports.editPATCH = editPATCH;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield category_model_1.default.update({
            deleted: true,
            deletedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            code: 200,
            message: "Xóa danh mục thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa danh mục thất bại"
        });
    }
});
exports.deleteItem = deleteItem;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const status = req.query.status;
        const statusChange = (status == "active") ? "inactive" : "active";
        yield category_model_1.default.update({
            status: statusChange
        }, {
            where: {
                id: id
            }
        });
        req["flash"]("success", "Đổi trạng thái thành công");
        res.json({
            code: 200,
            message: "Đổi trạng thái thành công"
        });
    }
    catch (error) {
        req["flash"]("error", "Đổi trạng thái thất bại");
        res.json({
            code: 400,
            message: "Đổi trạng thái thất bại"
        });
    }
});
exports.changeStatus = changeStatus;
