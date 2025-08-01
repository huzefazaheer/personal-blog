import axios from 'axios'
import { api } from '../App'

export async function getPostComments(jwt, postid) {
  const response = await axios.get(api + 'comments?postid=' + postid, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response.data
}

export async function getCommentById(id) {
  const response = await axios.get(api + 'comments/' + id)
  return response.data
}

export async function deleteComment(jwt, id) {
  const response = await axios.delete(api + 'comments/' + id, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response
}

export async function apipushComment(jwt, comment, postid) {
  const response = await axios.post(
    api + 'comments?postid=' + postid,
    {
      comment,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  )
  return response
}

export async function apieditComment(jwt, id, comment) {
  const response = await axios.put(
    api + 'comments/' + id,
    {
      comment,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  )
  return response
}
