const express = require('express')
const postRouter = require('./routes/postRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/posts', postRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(8080)

//posts
//posts/post
//posts/post/comments
//posts/post/comments/comment
