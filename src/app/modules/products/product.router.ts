import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router()

productRouter.post('/', productController.createBike)
productRouter.get('/:productId', productController.getSingleBike)
productRouter.get('/', productController.getAllBikes)
productRouter.put('/:productId', productController.updateBike)
productRouter.delete('/:productId', productController.deleteBike)

export default productRouter