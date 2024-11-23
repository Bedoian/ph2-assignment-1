import { Request, Response } from "express";
import { orderService } from "./order.service";
import Product from "../products/product.model";
import mongoose from "mongoose";


const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const product = await Product.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(payload.product) } },
            { $project: { quantity: 1, } }]);

        if (product.length === 0) {
            console.log('Product not found');
            return null;
        }
        if (product[0].quantity === 0 || product[0].quantity < payload.quantity) {
            await Product.findByIdAndUpdate(payload.product, {
                inStock: false
            })
            return res.status(400).json({
                message: `Insufficient stocks, We only have ${product[0].quantity} to sell`,
                success: false,
            })

        }
        await Product.findByIdAndUpdate(
            payload.product,
            { $inc: { quantity: -payload.quantity } },
            { new: true }
        );
        const result = await orderService.createOrder(payload)
        res.status(201).json({
            message: 'Order Pressed successfully',
            success: true,
            data: result,
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
            message: 'Aggregation done successfully ',
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
