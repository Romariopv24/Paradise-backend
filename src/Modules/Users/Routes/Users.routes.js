import express from 'express'
import { registerUser } from '../Controllers/User.controller.js'

const router = express.Router()

router.post('/register', registerUser)
// router.post('/login', loginUser)
// router.post('/logout', logoutUserMySql)

export default router