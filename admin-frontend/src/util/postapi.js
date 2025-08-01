import axios from 'axios'
import { api } from '../App'

export async function getPostById(jwt, id) {
  const response = await axios.get(api + 'posts/' + id, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response.data
}

export async function getAllPosts(jwt) {
  const response = await axios.get(api + 'posts/all', {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response.data
}

export async function getPublicPosts() {
  const response = await axios.get(api + 'posts')
  return response.data
}

export async function setPostPublic(jwt, id) {
  const response = await axios.post(
    api + 'posts/' + id + '/setpublic',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  )
  return response.data
}

export async function setPostPrivate(jwt, id) {
  const response = await axios.post(
    api + 'posts/' + id + '/setprivate',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  )
  return response.data
}

export async function deletePost(jwt, id) {
  const response = await axios.delete(api + 'posts/' + id, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response
}
