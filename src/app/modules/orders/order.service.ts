import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: IOrder) => {
        const order = await Order.create(payload);
        return order
};

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