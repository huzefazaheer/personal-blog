const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/postRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const commentRouter = require('./routes/commentRoutes')
const { login } = require('./controllers/auth')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/auth', authRouter)

app.use(async (error, req, res, next) => {
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
        res.status(403).json({ error: "Forbidden: You don't have permission" })
    } catch (error) {
      res.status(500).json({ error: 'Internal Database Error' })
    }
  } else res.status(400).json({ error: 'Bad Request: Missing required fields' })
}, login)

app.listen(8080, () => {
  console.log('Server started on port:', '8080')
})

//posts
//posts/post
//posts/post/comments
//posts/post/comments/comment
