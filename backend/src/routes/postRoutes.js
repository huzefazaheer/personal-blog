const { Router } = require('express')
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
} = require('../models/db')
const { auth, isAdmin } = require('../controllers/auth')

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
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

postRouter.post('/', auth, isAdmin, async (req, res) => {
  try {
    if (!(req.body.title && req.body.text && req.user.id)) {
      res.status(400).json({ error: 'Bad Request: Missing required fields ' })
    }

    await createPost(req.body.title, req.body.text, req.user.id)
    res.status(200).json({ status: 'Data sent successfull' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

postRouter.get('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id)
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

postRouter.delete('/:id', async (req, res) => {
  try {
    await deletePost(req.params.id)
    res.status(200)
    return
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

// postRouter.put('/:id', async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Database Error' })
//   }
// })

postRouter.use('/:id/comments', (req, res, next) => {
  req.postId = req.params.id
  const red = '/comments?postid=' + req.params.id
  res.redirect(red)
})

module.exports = postRouter

//todo add is published
