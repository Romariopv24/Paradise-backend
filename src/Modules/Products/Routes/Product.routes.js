import express from 'express'
import { addProducts, deleProduct, getProducts } from '../Controllers/Product.controller.js'


const router = express.Router()

router.get('/products', getProducts)
router.post('/products', addProducts)
router.delete('/:productId', deleProduct)

export default router