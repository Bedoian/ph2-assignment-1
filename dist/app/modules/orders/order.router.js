"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', order_controller_1.orderControll.createOrder);
orderRouter.get('/revenue', order_controller_1.orderControll.orderAggregate);
exports.default = orderRouter;
