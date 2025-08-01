import { useEffect, useState } from 'react'
import {
  deletePost,
  getAllPosts,
  getPostById,
  setPostPublic,
} from '../../util/postapi'

import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'
import PostForm from '../../components/postform/postform'

export default function AllPosts({ jwt }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [showPostForm, setShowPostForm] = useState({
    show: false,
    newpost: false,
  })
  const [prevPostData, setPrevPostData] = useState({})

  useEffect(() => {
    if (!jwt.current) {
      navigate('/')
      return
    }
    async function getData() {
      setData(await getAllPosts(jwt.current))
    }
    getData()
  }, [jwt])

  const posts = data.map((post) => {
    return (
      <Post
        post={post}
        setPostPub={setPostPub}
        delPost={delPost}
        editPost={editpost}
      ></Post>
    )
  })

  async function delPost(id) {
    console.log(await deletePost(jwt.current, id))
  }

  async function setPostPub(id) {
    console.log(await setPostPublic(jwt.current, id))
  }

  async function editpost(id) {
    const post = await getPostById(jwt, id)
    setPrevPostData(post)
    setShowPostForm({ show: true, newpost: false })
  }

  const res = (
    <>
      <Navbar />
      <h1>All Posts</h1>
      {posts}
      <button onClick={() => setShowPostForm({ show: true, newpost: true })}>
        New Post
      </button>
    </>
  )

  return (
    <>
      {showPostForm.show ? (
        showPostForm.newpost ? (
          <PostForm
            oldtitle=""
            oldtext=""
            newPost={true}
            setShowPostForm={setShowPostForm}
          />
        ) : (
          <PostForm
            oldtitle={prevPostData.title}
            oldtext={prevPostData.text}
            newPost={false}
            setShowPostForm={setShowPostForm}
          />
        )
      ) : (
        res
      )}
    </>
  )
}

function Post({ post, setPostPub, delPost, editPost }) {
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.id}</p>
      <button id="alt" onClick={() => editPost(post.id)}>
        Edit
      </button>
      <button id="alt" onClick={() => delPost(post.id)}>
        Delete
      </button>
      <button id="alt" onClick={() => setPostPub(post.id)}>
        Make Public
      </button>
    </div>
  )
}
