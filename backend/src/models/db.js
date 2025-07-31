const { PrismaClient } = require('../../generated/prisma/client.js')
const prisma = new PrismaClient()

async function getAllPosts(jump = 0, limit = 10) {
  const posts = await prisma.post.findMany({
    skip: jump,
    take: limit,
  })

  return posts
}

async function getAllUsers() {
  const users = await prisma.user.findMany({})

  return users
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

async function deleteUser(id) {
  await prisma.user.delete({
    where: { id: id },
  })
}

async function deletePost(id) {
  await prisma.post.delete({
    where: { id: id },
  })
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: { id: id },
  })
}

async function makeAdminById(id) {
  await prisma.user.update({
    where: { id: id },
    data: {
      isAdmin: true,
    },
  })
}

async function createComment(comment, userId, postId) {
  await prisma.comment.create({
    data: {
      comment: comment,
      commentedById: userId,
      commentedPostId: postId,
    },
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostById,
  getCommentById,
  getPostComments,
  createPost,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  makeAdminById,
  deletePost,
  deleteComment,
  createComment,
}
