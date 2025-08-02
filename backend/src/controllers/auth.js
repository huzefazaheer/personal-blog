require('dotenv').config()
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, getUserById } = require('../models/db')

async function signup(req, res) {
  if (req.body && req.body.username && req.body.password) {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const user1 = {
      username: req.body.username,
      password: hashedPass,
    }

    try {
      const user = await createUser(user1.username, user1.password)
      const jwt = jsonwebtoken.sign(
        { id: user.id, username: user.username, isAdmin: user.isAdmin },
        process.env.SECRET,
        { expiresIn: '1d' },
      )
      res.json(jwt)
    } catch (error) {
      console.log(error)
      res
        .status(409)
        .json({ error: 'Username already taken. Please choose another.' })
    }
  } else {
    res.status(400).json({ error: 'Bad Request: Missing required fields ' })
  }
}

async function auth(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    // res.status(401).json({ error: 'Unauthorized: Missing or invalid token' })
    const error = new Error('401')
    next(error)
    return
  }
  const token = authHeader.split(' ')[1]

  jsonwebtoken.verify(token, process.env.SECRET, function (error, decoded) {
    if (error) {
      res.status(403).json({ error: "Forbidden: You don't have permission" })
    } else {
      req.user = jsonwebtoken.decode(token)
      next()
    }
  })
}

async function isAdmin(req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json({ error: "Forbidden: You don't have permission" })
    }
  } else res.status(403).json({ error: "Forbidden: You don't have permission" })
}

async function login(req, res) {
  const user1 = req.user
  if (req.user) {
    const user = await getUserById(user1.id)
    const jwt = jsonwebtoken.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      process.env.SECRET,
      { expiresIn: '1d' },
    )
    res.json(jwt)
  } else res.status(403).json({ error: "Forbidden: You don't have permission" })
}

module.exports = { signup, auth, isAdmin, login }
