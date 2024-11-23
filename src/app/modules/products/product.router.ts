import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router()

productRouter.post('/', productController.createUser)

export default productRouter