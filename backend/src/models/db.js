const { PrismaClient } = require('../../generated/prisma/client.js')
const { connect } = require('../routes/postRoutes.js')
const prisma = new PrismaClient()

async function getAllPosts(jump = 0, limit = 10) {
  const posts = await prisma.post.findMany({
    skip: jump,
    take: limit,
  })

  return posts
}

async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: { id: id },
  })

  return post
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  })

  return user
}

async function getCommentById(id) {
  const comment = await prisma.comment.findUnique({
    where: { id: id },
  })

  return comment
}

async function getPostComments(id) {
  const comments = await prisma.comment.findMany({
    where: { postCommented: id },
  })

  return comments
}

async function createPost(title, text, authorId) {
  await prisma.post.create({
    data: {
      text: text,
      title: title,
      authorId: authorId,
    },
  })
}

async function createUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  })

  return user
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostById,
  getCommentById,
  getPostComments,
  createPost,
  createUser,
}
