import { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { getAllUsers, makeUserAdmin, deleteUser } from '../../util/userapi'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'

export default function AllUsers({ jwt }) {
  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    if (!jwt.current) {
      navigate('/')
      return
    }
    async function getData() {
      setData(await getAllUsers(jwt.current))
    }
    getData()
  }, [jwt])

  async function makeAdmin(id) {
    console.log(await makeUserAdmin(jwt.current, id))
  }

  async function delUser(id) {
    console.log(await deleteUser(jwt.current, id))
  }

  const users = data.map((user) => {
    return (
      <User
        key={crypto.randomUUID()}
        user={user}
        makeAdmin={makeAdmin}
        delUser={delUser}
      ></User>
    )
  })

  return (
    <>
      <Navbar />
      <h1>All Users</h1>
      {users}
    </>
  )
}

function User({ user, makeAdmin, delUser }) {
  return (
    <div className={styles.post}>
      <h3>Username: {user.username}</h3>
      <p>Id: {user.id}</p>
      <p>Role: {user.isAdmin ? 'Admin' : 'Member'}</p>
      <button
        id="alt"
        onClick={() => {
          delUser(user.id)
        }}
      >
        Delete
      </button>
      <button
        id="alt"
        onClick={() => {
          makeAdmin(user.id)
        }}
      >
        Make Admin
      </button>
    </div>
  )
}
