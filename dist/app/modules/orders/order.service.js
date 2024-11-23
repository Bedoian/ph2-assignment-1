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
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.create(payload);
    return order;
});
const getOrderAggregate = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
        {
            $project: {
                email: 1,
                product: 1,
                quantity: 1,
                totalPrice: 1,
                total: { $multiply: ["$quantity", "$totalPrice"] }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" }
            }
        }
    ]);
    return result;
});
exports.orderService = {
    createOrder,
    getOrderAggregate
};