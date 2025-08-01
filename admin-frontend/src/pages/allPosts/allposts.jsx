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
    id: null,
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
        setPostPriv={setPostPriv}
      ></Post>
    )
  })

  async function delPost(id) {
    console.log(await deletePost(jwt.current, id))
  }

  async function setPostPub(id) {
    console.log(await setPostPublic(jwt.current, id))
  }

  async function setPostPriv(id) {
    console.log(await setPostPriv(jwt.current, id))
  }

  async function editpost(id) {
    const post = await getPostById(jwt, id)
    setPrevPostData(post)
    setShowPostForm({ show: true, newpost: false, id: id })
  }

  const res = (
    <>
      <Navbar />
      <h1>All Posts</h1>
      {posts}
      <button
        onClick={() => setShowPostForm({ show: true, newpost: true, id: null })}
      >
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
            showPostForm={showPostForm}
            setShowPostForm={setShowPostForm}
            jwt={jwt.current}
          />
        ) : (
          <PostForm
            oldtitle={prevPostData.title}
            oldtext={prevPostData.text}
            showPostForm={showPostForm}
            setShowPostForm={setShowPostForm}
            jwt={jwt.current}
          />
        )
      ) : (
        res
      )}
    </>
  )
}

function Post({ post, setPostPub, delPost, editPost, setPostPriv }) {
  const navigate = useNavigate()
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.isPublished ? 'Public Post' : 'Private Post'}</p>
      <button id="alt" onClick={() => navigate('/comments?postid=' + post.id)}>
        Edit Comments
      </button>
      <button id="alt" onClick={() => editPost(post.id)}>
        Edit Post
      </button>
      <button id="alt" onClick={() => delPost(post.id)}>
        Delete
      </button>
      {post.isPublished ? (
        <button id="alt" onClick={() => setPostPriv(post.id)}>
          Make Private
        </button>
      ) : (
        <button id="alt" onClick={() => setPostPub(post.id)}>
          Make Public
        </button>
      )}
    </div>
  )
}
