import axios from 'axios'
import { api } from '../App'

export async function getAllUsers(jwt) {
  const response = await axios.get(api + 'users', {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response.data
}

export async function makeUserAdmin(jwt, id) {
  const response = await axios.put(
    api + 'users/' + id + '/makeadmin',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  )
  return response
}

export async function deleteUser(jwt, id) {
  const response = await axios.delete(api + 'users/' + id, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response
}
