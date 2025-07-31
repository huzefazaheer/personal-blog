const { Router } = require('express')
const { signup, login } = require('../controllers/auth')

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login, (req, res) => {
  res.status(200).json({ status: 'Logged in successfull' })
})

module.exports = authRouter
