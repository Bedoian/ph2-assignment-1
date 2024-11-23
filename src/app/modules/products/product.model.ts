import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Validation error'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9\s-]+$/, 'Validation error']
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: {values:[' Mountain', 'Road', 'Hybrid', 'Electric'],message:`{VALUE} is not a valid categoy! please provide valid one`},
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is Requred'],
        min: [0, 'Min cannot be a negeive value']
    },
    inStock: {
        type: Boolean,
        required: [true, 'This Field is required'],
        default: true
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
        timestamps: true
    }
)

const Product = mongoose.model('product', productSchema)
export default Product