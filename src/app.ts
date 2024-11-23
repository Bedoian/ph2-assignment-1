import express, { Request, Response } from 'express';
import productRouter from './app/modules/products/product.router';
const app = express()
// middlewares
app.use(express.json())

// router defination
app.use('/api/product',productRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send('hi app is running on the server')
})
export default app