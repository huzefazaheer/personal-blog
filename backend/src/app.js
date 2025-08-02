const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/postRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const commentRouter = require('./routes/commentRoutes')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsoptions = {
  origin: process.env.ADMINAPP,
  optionsSuccessStatus: 200,
}

app.use(cors(corsoptions))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/auth', authRouter)

app.listen(8080, () => {
  console.log('Server started on port:', '8080')
})

//posts
//posts/post
//posts/post/comments
//posts/post/comments/comment
