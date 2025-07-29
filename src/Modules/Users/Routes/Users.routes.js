import express from 'express'
import { registerUser, loginUser, logoutUser } from '../Controllers/User.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router