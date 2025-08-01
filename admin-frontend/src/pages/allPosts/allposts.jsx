import { useEffect, useState } from 'react'
import { deletePost, getAllPosts, setPostPublic } from '../../util/postapi'

import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'

export default function AllPosts({ jwt }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!jwt.current) {
      navigate('/')
      return
    }
    async function getData() {
      setData(await getAllPosts(jwt.current))
    }
    getData()
  }, [jwt.current])

  const posts = data.map((post) => {
    return <Post post={post} setPostPub={setPostPub} delPost={delPost}></Post>
  })

  async function delPost(id) {
    console.log(await deletePost(jwt.current, id))
  }

  async function setPostPub(id) {
    console.log(await setPostPublic(jwt.current, id))
  }

  return (
    <>
      <Navbar />
      <h1>All Posts</h1>
      {posts}
      <button>New Post</button>
    </>
  )
}

function Post({ post, setPostPub, delPost }) {
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <button id="alt">Edit</button>
      <button id="alt" onClick={() => delPost(post.id)}>
        Delete
      </button>
      <button id="alt" onClick={() => setPostPub(post.id)}>
        Make Public
      </button>
    </div>
  )
}
