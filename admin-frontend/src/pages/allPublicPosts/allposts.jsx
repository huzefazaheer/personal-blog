import { useEffect, useState } from 'react'
import {
  deletePost,
  getAllPosts,
  getPublicPosts,
  setPostPrivate,
} from '../../util/postapi'

import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'

export default function AllPublicPosts({ jwt }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!jwt.current) {
      navigate('/')
      return
    }
    async function getData() {
      setData(await getPublicPosts())
    }
    getData()
  }, [jwt])

  async function setPostPriv(id) {
    console.log(await setPostPrivate(jwt.current, id))
  }

  async function delPost(id) {
    console.log(await deletePost(jwt.current, id))
  }

  const posts = data.map((post) => {
    return <Post post={post} setPostPriv={setPostPriv} delPost={delPost}></Post>
  })

  if (!jwt.current) {
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <h1>All Public Posts</h1>
      {posts}
    </>
  )
}

function Post({ post, setPostPriv, delPost }) {
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <button id="alt">Edit</button>
      <button id="alt" onClick={() => delPost(post.id)}>
        Delete
      </button>
      <button id="alt" onClick={() => setPostPriv(post.id)}>
        Make Private
      </button>
    </div>
  )
}
