const { Router } = require('express')

const userRouter = Router()

const {
  getAllUsers,
  getUserById,
  deleteUser,
  makeAdminById,
} = require('../models/db')
const { auth, isAdmin } = require('../controllers/auth')

userRouter.get('/', auth, isAdmin, async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

userRouter.get('/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

userRouter.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    await deleteUser(req.params.id)
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

userRouter.put('/:id/makeadmin', auth, isAdmin, async (req, res) => {
  try {
    await makeAdminById(req.params.id)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

module.exports = userRouter
