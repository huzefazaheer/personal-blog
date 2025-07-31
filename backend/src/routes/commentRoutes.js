const { Router } = require('express')

const commentRouter = Router()

const {
  getPostComments,
  getCommentById,
  delteComment,
  createComment,
  deleteComment,
  updateComment,
} = require('../models/db')
const { auth, isAdmin } = require('../controllers/auth')

commentRouter.get('/', async (req, res) => {
  try {
    const comments = await getPostComments(req.query.postid)
    res.json(comments)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

commentRouter.post('/', auth, isAdmin, async (req, res) => {
  try {
    if (!(req.body.comment && req.user.id)) {
      res.status(400).json({ error: 'Bad Request: Missing required fields ' })
    }

    await createComment(req.body.comment, req.user.id, req.query.postid)
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
    res.status(200).json({ status: 'Request successfull' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

commentRouter.put('/:id', auth, async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id)
    if (comment.commentedById === req.user.id) {
      try {
        if (req.body.comment) {
          await updateComment(req.body.comment, req.params.id)
          res.status(200).json({ status: 'Request successfull' })
        } else
          res
            .status(400)
            .json({ error: 'Bad Request: Missing required fields ' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Database Error' })
      }
    } else {
      res.status(403).json({ error: "Forbidden: You don't have permission" })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

module.exports = commentRouter
