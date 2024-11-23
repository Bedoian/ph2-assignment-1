import { Request, Response } from "express";
import { productService } from "./product.service"
const createBike = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const result = await productService.createBike(payload)
        res.json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        })
    }
    catch (err: any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
const getAllBikes = async (req: Request, res: Response) => {
    try {
        const result = await productService.getAllBikes()
        res.json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: result,
        })
    }
    catch (err: any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
const getSingleBike = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await productService.getSingleBike(productId);
        res.json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: result,
        })
    }
    catch (err: any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
const updateBike = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { body } = req
        const result = await productService.updateBike(productId, body);
        res.json({
            message: 'Bike updated successfully',
            success: true,
            data: result,
        })
    }
    catch (err: any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
        console.log(err);
    }
}
const deleteBike = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await productService.deleteBike(productId);
        res.json({
            message: 'Bike deleted successfully',
            success: true,
            data: {},
        })
    }
    catch (err: any) {
        res.json({
            message: 'Validation failed',
            success: false,
            data: err,
            stack: err.stack
        })
    }
}

export const productController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
}