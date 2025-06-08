import express from 'express'
import { registerUser } from '../Controllers/User.controller.js'

const router = express.Router()

router.post('/register', registerUser)

export default router