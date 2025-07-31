const { Router } = require('express')

const commentRouter = Router()

const {
  getPostComments,
  getCommentById,
  delteComment,
  createComment,
  deleteComment,
} = require('../models/db')
const { auth, isAdmin } = require('../controllers/auth')

commentRouter.get('/', async (req, res) => {
  try {
    const comments = await getPostComments()
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

commentRouter.post('/', auth, isAdmin, async (req, res) => {
  try {
    if (!(req.body.comment && req.user.id)) {
      res.status(400).json({ error: 'Bad Request: Missing required fields ' })
    }

    await createComment(req.body.comment, req.user.id, req.postId)
    res.status(200).json({ status: 'Data sent successfull' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

commentRouter.get('/:id', async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id)
    res.json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

commentRouter.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    await deleteComment(req.params.id)
    res.status(200)
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

// commentRouter.put('/:id/makeadmin', auth, isAdmin, async (req, res) => {

// })

module.exports = commentRouter
