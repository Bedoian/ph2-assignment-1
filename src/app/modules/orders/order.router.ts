import { Router } from "express";
import { orderControll } from "./order.controller";


const orderRouter = Router()

orderRouter.post('/',orderControll.createOrder)
orderRouter.get('/revenue', orderControll.orderAggregate)

export default orderRouter