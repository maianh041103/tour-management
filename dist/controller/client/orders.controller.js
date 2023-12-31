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
exports.success = exports.order = void 0;
const order_model_1 = __importDefault(require("../../models/order.model"));
const generate_helper_1 = require("../../helper/generate.helper");
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const orders_item_model_1 = __importDefault(require("../../models/orders-item.model"));
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let order = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    };
    const newOrder = yield order_model_1.default.create(order);
    const code = (0, generate_helper_1.generateCodeOrder)(newOrder["id"]);
    yield order_model_1.default.update({
        code: code
    }, {
        where: {
            id: newOrder["id"]
        }
    });
    for (const item of data.cart) {
        const tour = yield tour_model_1.default.findOne({
            where: {
                id: item["tourId"],
                deleted: false
            },
            raw: true
        });
        let dataOrderItem = {
            orderId: newOrder["id"],
            tourId: item["tourId"],
            quantity: item["quantity"],
            price: tour["price"],
            discount: tour["discount"],
            timeStart: tour["timeStart"]
        };
        yield orders_item_model_1.default.create(dataOrderItem);
    }
    res.json({
        code: 200,
        message: "Đặt hành thành công",
        orderCode: code
    });
});
exports.order = order;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCode = req.query.orderCode;
    const order = yield order_model_1.default.findOne({
        where: {
            code: orderCode,
            deleted: false
        },
        raw: true
    });
    const listOrderItem = yield orders_item_model_1.default.findAll({
        where: {
            orderId: order["id"]
        },
        raw: true
    });
    for (const item of listOrderItem) {
        const tour = yield tour_model_1.default.findOne({
            where: {
                id: item["tourId"],
                deleted: false
            },
            raw: true
        });
        if (tour["images"])
            item["image"] = JSON.parse(tour["images"])[0];
        else
            item["image"] = "";
        item["slug"] = tour["slug"];
        item["title"] = tour["title"];
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["price_special"] * item["quantity"];
    }
    order["total"] = listOrderItem.reduce((calc, item, index) => {
        return calc + item["total"];
    }, 0);
    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        listOrderItem: listOrderItem
    });
});
exports.success = success;
