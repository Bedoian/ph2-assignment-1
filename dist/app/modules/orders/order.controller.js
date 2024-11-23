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
exports.orderControll = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = __importDefault(require("../products/product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const product = yield product_model_1.default.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(payload.product) } },
            { $project: { quantity: 1, } }
        ]);
        if (product.length === 0) {
            console.log('Product not found');
            return null;
        }
        if (product[0].quantity === 0 || product[0].quantity < payload.quantity) {
            yield product_model_1.default.findByIdAndUpdate(payload.product, {
                inStock: false
            });
            return res.status(400).json({
                message: `Insufficient stocks, We only have ${product[0].quantity} to sell`,
                success: false,
            });
        }
        yield product_model_1.default.findByIdAndUpdate(payload.product, { $inc: { quantity: -payload.quantity } }, { new: true });
        const result = yield order_service_1.orderService.createOrder(payload);
        res.status(201).json({
            message: 'Order Pressed successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(401).json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
const orderAggregate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getOrderAggregate();
        const total = result[0].totalRevenue;
        res.status(201).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: {
                totalRevenue: total
            },
        });
    }
    catch (err) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
exports.orderControll = {
    createOrder,
    orderAggregate
};
