import express from 'express'
import { registerUser, loginUser, logoutUser, registerUserSql } from '../Controllers/User.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/registersql', registerUserSql)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router