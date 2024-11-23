import { IProduct } from "./product.interface";
import Product from "./product.model";


const createBike = async (payload: IProduct) => {
    const result = await Product.create(payload)
    return result
}

const getAllBikes = async () => {
    const result = await Product.find()
    return result
}
const getSingleBike = async (id: string) => {
    const result = await Product.findById(id)
    return result
}
const updateBike = async (id: string, doc: Partial<IProduct>) => {
    const result = await Product.findByIdAndUpdate(id, doc, { new: true })
    return result
}
const deleteBike = async (id: string) => {
    const result = await Product.findByIdAndDelete(id)
    return result
}

export const productService = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
}