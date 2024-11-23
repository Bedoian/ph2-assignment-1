import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Invalid email address"],
        unique: true,
    },
    product: {
        type: String,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true,
    })

const Order = mongoose.model('order', orderSchema);
export default Order;