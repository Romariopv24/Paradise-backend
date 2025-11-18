import express from 'express'
import { addProducts, deleProduct, getProducts, updateProduct, getProductById } from '../Controllers/Product.controller.js'


const router = express.Router()

router.get('/products', getProducts)
router.get('/product', getProductById)
router.post('/products', addProducts)
router.delete('/:productId', deleProduct)
router.put('/:productId', updateProduct)

export default router