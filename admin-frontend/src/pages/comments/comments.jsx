import { useEffect, useState } from 'react'
import {
  deletePost,
  getAllPosts,
  getPostById,
  setPostPublic,
} from '../../util/postapi'

import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'
import PostForm from '../../components/postform/postform'
import {
  deleteComment,
  getCommentById,
  getPostComments,
} from '../../util/commentsapi'
import CommentForm from '../../components/commentform/commentform'

export default function Comments({ jwt }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [params] = useSearchParams()
  const [showCommentForm, setShowCommentForm] = useState({
    show: false,
    newcomment: false,
    id: null,
    blogid: null,
  })
  const [prevCommentData, setPrevCommentData] = useState({})

  useEffect(() => {
    if (!jwt.current) {
      navigate('/')
      return
    }
    async function getData() {
      setData(await getPostComments(jwt.current, params.get('postid')))
      console.log(data)
    }
    getData()
  }, [jwt])

  async function deleteCom(id) {
    console.log(await deleteComment(jwt.current, id))
  }

  async function editComment(id) {
    const comment = await getCommentById(id)
    setPrevCommentData(comment)
    setShowCommentForm({ show: true, newpost: false, id: id })
  }

  const comments = data.map((comment) => {
    return (
      <Comment
        comment={comment}
        deleteCom={deleteCom}
        editComment={editComment}
      ></Comment>
    )
  })

  const res = (
    <>
      <Navbar />
      <h1>All Comments</h1>
      {comments}
      <button
        onClick={() =>
          setShowCommentForm({
            show: true,
            newcomment: true,
            id: null,
            blogid: params.get('postid'),
          })
        }
      >
        New Comment
      </button>
    </>
  )

  return (
    <>
      {showCommentForm.show ? (
        showCommentForm.newpost ? (
          <CommentForm
            oldcomment=""
            showCommentForm={showCommentForm}
            setShowCommentForm={setShowCommentForm}
            jwt={jwt.current}
          />
        ) : (
          <CommentForm
            oldcomment={prevCommentData}
            showCommentForm={showCommentForm}
            setShowCommentForm={setShowCommentForm}
            jwt={jwt.current}
          />
        )
      ) : (
        res
      )}
    </>
  )
}

function Comment({ comment, deleteCom, editComment }) {
  return (
    <div>
      <p>{comment.id}</p>
      <p>{comment.comment}</p>
      <button id="alt" onClick={() => deleteCom(comment.id)}>
        Delete
      </button>
      <button id="alt" onClick={() => editComment(comment.id)}>
        Edit
      </button>
    </div>
  )
}
