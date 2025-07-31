import axios from 'axios'
import { api } from '../App'

export function getAllPosts(jwt) {
  axios
    .get(api + 'posts/all', { headers: { Authorization: `Bearer ${jwt}` } })
    .then((response) => {
      console.log(response)
    })
}

export function getPublicPosts() {
  axios.get(api + 'posts').then((response) => {
    console.log(response.data)
  })
}
