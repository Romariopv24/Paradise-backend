import express from 'express'
import { addProducts, deleProduct, getProducts, updateProduct, getProductById } from '../Controllers/Product.controller.js'


const router = express.Router()

router.get('/products', getProducts)
router.get('/product/:productId', getProductById) // 💡 CAMBIO A: /product/:productId (Para obtener por ID)
router.post('/products', addProducts)

// 💡 CAMBIOS CLAVE: Agrega el prefijo /products
router.delete('/products/:productId', deleProduct) 
router.put('/products/:productId', updateProduct)

export default router