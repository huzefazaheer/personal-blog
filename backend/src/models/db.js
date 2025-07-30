const { PrismaClient } = require('../../generated/prisma/client.js')
const prisma = new PrismaClient()

async function getAllPosts(limit, jump) {
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

module.exports = {
  getAllPosts,
  getPostById,
  getPostById,
  getCommentById,
  getPostComments,
}
