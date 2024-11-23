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
            message: 'Bikes loaded successfully',
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
        const { id } = req.params;
        const result = await productService.getSingleBike(id);
        res.json({
            message: 'Single bike loaded successfully',
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
        const { id } = req.params;
        const { body } = req
        const result = await productService.updateBike(id, body);
        res.json({
            message: 'bike updated successfully',
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
        const { id } = req.params;
        const result = await productService.deleteBike(id);
        res.json({
            message: 'bike deleted successfully',
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
        console.log(err);
    }
}

export const productController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
}