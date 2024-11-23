import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router()

productRouter.post('/', productController.createBike)
productRouter.get('/:id', productController.getSingleBike)
productRouter.get('/', productController.getAllBikes)
productRouter.put('/:id', productController.updateBike)
productRouter.delete('/:id', productController.deleteBike)

export default productRouter