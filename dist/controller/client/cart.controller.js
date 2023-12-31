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
exports.listJSON = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/cart/index.pug', {
        pageTitle: "Trang giỏ hàng"
    });
});
exports.index = index;
const listJSON = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = req.body;
    let dataReturn = [];
    if (tours) {
        for (let item of tours) {
            const tour = yield tour_model_1.default.findOne({
                where: {
                    id: item.tourId,
                    deleted: false,
                    status: "active"
                },
                raw: true
            });
            tour["price_special"] = tour["price"] * (1 - tour["discount"] / 100);
            tour["images"] = JSON.parse(tour["images"]);
            tour["total"] = tour["price_special"] * item.quantity;
            tour["quantity"] = item.quantity;
            dataReturn.push(tour);
        }
        res.json({
            data: dataReturn
        });
    }
});
exports.listJSON = listJSON;
