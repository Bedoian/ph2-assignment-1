import { Request, Response } from "express";
import { orderService } from "./order.service";
const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const order = await orderService.createOrder(payload)
        res.status(201).json({
            message: 'Order Pressed successfully',
            success: true,
            data: order,
        })
    }
    catch (err: any) {
        res.status(401).json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
const orderAggregate = async (req: Request, res: Response) => {
    try {

        const result = await orderService.getOrderAggregate()
        const total = result[0].totalRevenue
        res.status(201).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: {
                totalRevenue: total
            },
        })
    }
    catch (err: any) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
export const orderControll = {
    createOrder,
    orderAggregate
}