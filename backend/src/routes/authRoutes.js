const { Router } = require('express')
const { signup, login, auth } = require('../controllers/auth')

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', auth, login)

module.exports = authRouter
