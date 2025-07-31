const { Router } = require('express')
const { getAllPosts } = require('../models/db')

const postRouter = Router()

postRouter.get('/', async (req, res) => {
  let jump = 0
  if (req.query.j) {
    jump = req.query.j * 10
  }
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    res.json(error)
  }
})

postRouter.post('/', async (req, res) => {})

module.exports = postRouter
