import mongoose from "mongoose";
import Product from "../products/product.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: IOrder) => {
    const product = await Product.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(payload.product) } },
        { $project: { quantity: 1, } }]);

    if (product.length === 0) {
        console.log('Product not found');
        return null;
    }
    else if (product[0].quantity < payload.quantity) {
        return {
            message: `Insufficient stocks, We only have ${product[0].quantity} to sell`,
            success: false,
        }
    }
    else if (product[0].quantity === 0) {
        await Product.findByIdAndUpdate(payload.product, {
            inStock: false
        })
        return {
            message: 'No stock available right now'
        }
    }
    else {
        await Product.findByIdAndUpdate(
            payload.product,
            { $inc: { quantity: -payload.quantity } },
            { new: true }
        );
        const order = await Order.create(payload);
        return order
    }

}

const getOrderAggregate = async () => {
    const result = await Order.aggregate([
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
    return result
}

export const orderService = {
    createOrder,
    getOrderAggregate
}