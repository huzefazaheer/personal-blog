const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { signup, login, auth } = require('../controllers/auth')
const { getUserByUsername } = require('../models/db')

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', auth, login)

authRouter.use(
  '/login',
  async function loginerror(err, req, res, next) {
    if (req.body && req.body.username && req.body.password) {
      try {
        const user = await getUserByUsername(req.body.username)
        if (user) {
          const isPassMatch = await bcrypt.compare(
            req.body.password,
            user.password,
          )
          if (isPassMatch) {
            req.user = user
            next()
          } else
            res
              .status(403)
              .json({ error: "Forbidden: You don't have permission" })
        } else
          res
            .status(403)
            .json({ error: "Forbidden: You don't have permission" })
      } catch (error) {
        res.status(500).json({ error: 'Internal Database Error' })
      }
    } else
      res.status(400).json({ error: 'Bad Request: Missing required fields' })
  },
  login,
)

module.exports = authRouter
