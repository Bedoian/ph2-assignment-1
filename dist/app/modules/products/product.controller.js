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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield product_service_1.productService.createBike(payload);
        res.json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
const getAllBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getAllBikes();
        res.json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getSingleBike(productId);
        res.json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { body } = req;
        const result = yield product_service_1.productService.updateBike(productId, body);
        res.json({
            message: 'Bike updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
        console.log(err);
    }
});
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.productService.deleteBike(productId);
        res.json({
            message: 'Bike deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        });
    }
});
exports.productController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
};
