const express = require('express')
const postRouter = require('./routes/postRoutes')
const app = express()

app.use('/posts', postRouter)

app.listen(8080)

//posts
//posts/post
//posts/post/comments
//posts/post/comments/comment
