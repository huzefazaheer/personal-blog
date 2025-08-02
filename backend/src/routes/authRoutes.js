const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { signup, login, auth } = require('../controllers/auth')
const { getUserByUsername } = require('../models/db')

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', auth, login)

module.exports = authRouter
