import express from 'express' 
import { addOrder, getOrders } from '../Controllers/Order.controller.js'

const router = express.Router()

router.get('/orders', getOrders)
router.post('/orders', addOrder)

export default router