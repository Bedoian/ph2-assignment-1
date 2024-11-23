import { Request, Response } from "express";
import { productService } from "./product.service"


const createUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const result = await productService.addProduct(payload)
        res.json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        })
    }
    catch (err:any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}

export const productController = {
    createUser
}