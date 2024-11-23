import express, { Request, Response } from 'express';
import productRouter from './app/modules/products/product.router';
import orderRouter from './app/modules/orders/order.router';
const app = express()
// middlewares
app.use(express.json())

// router defination
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send('hi app is running on the server')
})
export default app