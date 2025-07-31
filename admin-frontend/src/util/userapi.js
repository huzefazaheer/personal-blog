import axios from 'axios'
import { api } from '../App'

export function getAllUsers(jwt) {
  axios
    .get(api + 'users', { headers: { Authorization: `Bearer ${jwt}` } })
    .then((response) => {
      console.log(response)
    })
}
