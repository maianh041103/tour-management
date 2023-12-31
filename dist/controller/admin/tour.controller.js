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
exports.deleteItem = exports.editPATCH = exports.edit = exports.detail = exports.changeStatus = exports.createPOST = exports.create = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const generate_helper_1 = require("../../helper/generate.helper");
const tours_categories_1 = __importDefault(require("../../models/tours-categories"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = yield tour_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    for (const tour of tours) {
        tour["price_special"] = tour["price"] * (1 - tour["discount"] / 100);
        if (tour["images"]) {
            tour["image"] = JSON.parse(tour["images"])[0];
        }
        else {
            tour["image"] = "";
        }
    }
    res.render("admin/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/tours/create.pug", {
        pageTitle: "Thêm tour",
        categories: categories
    });
});
exports.create = create;
const createPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = req.body;
    if (tour["position"]) {
        tour["position"] = parseInt(tour["position"]);
    }
    else {
        const count = yield tour_model_1.default.count({
            where: {
                deleted: false
            }
        });
        tour["position"] = count + 1;
    }
    const code = (0, generate_helper_1.generateTourCode)(tour["position"]);
    const dataTour = {
        title: tour.title,
        code: code,
        price: parseInt(tour["price"]),
        discount: parseInt(tour["discount"]),
        stock: parseInt(tour["stock"]),
        information: tour["information"],
        schedule: tour["schedule"],
        timeStart: tour.timeStart,
        position: tour["position"],
        status: tour.status,
        images: JSON.stringify(tour["images"])
    };
    const newTour = yield tour_model_1.default.create(dataTour);
    yield tours_categories_1.default.create({
        tour_id: newTour["id"],
        category_id: req.body.category_id
    });
    res.redirect(`${system_1.systemConfig.prefixAdmin}/tours`);
});
exports.createPOST = createPOST;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const status = req.query.status;
        const statusChange = (status == "active") ? "inactive" : "active";
        yield tour_model_1.default.update({
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
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tour = yield tour_model_1.default.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    });
    tour["images"] = JSON.parse(tour["images"]);
    res.render("admin/pages/tours/detail.pug", {
        pageTitle: "Chi tiết tour",
        tour: tour
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_model_1.default.findOne({
        where: {
            id: req.params.id,
            deleted: false
        },
        raw: true
    });
    const tourCategory = yield tours_categories_1.default.findOne({
        where: {
            tour_id: req.params.id
        }
    });
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false
        }
    });
    res.render("admin/pages/tours/edit.pug", {
        pageTitle: "Sửa tour",
        tour: tour,
        tourCategory: tourCategory,
        categories: categories
    });
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const tourOld = yield tour_model_1.default.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        });
        if (!data.images) {
            data.images = tourOld["images"];
        }
        if (!data.timeStart) {
            data.timeStart = tourOld["timeStart"];
        }
        yield tour_model_1.default.update(data, {
            where: {
                id: req.params.id
            }
        });
        req["flash"]("success", "Sửa thông tin tour thành công");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Sửa thông tin tour thất bại");
        res.redirect("back");
    }
});
exports.editPATCH = editPATCH;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield tour_model_1.default.update({
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
