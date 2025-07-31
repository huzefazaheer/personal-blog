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
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}

app.use(cors(corsoptions))

app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/auth', authRouter)

app.listen(8080)

//posts
//posts/post
//posts/post/comments
//posts/post/comments/comment
