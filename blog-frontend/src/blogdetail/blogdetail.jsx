import { useEffect, useState } from 'react'
import { api } from '../homepage'
import Navbar from '../navbar/navbar'
import styles from './blogdetail.module.css'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'

export default function Blog({ jwt }) {
  const [data, setData] = useState([])
  const [commentsdata, setCommentsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentsupdate, setcommentsupdate] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    async function getData() {
      const res = await fetch(api + 'posts/' + id)
      const dat = await res.json()
      setData(dat)
      const res2 = await fetch(api + 'comments?postid=' + id)
      const dat2 = await res2.json()
      console.log(dat2)
      setCommentsData(dat2)
      setLoading(false)
    }
    getData()
  }, [commentsupdate])

  async function uploadComment(comment) {
    if (jwt) {
      const response = await fetch(`${api}comments?postid=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.current}`,
        },
        body: JSON.stringify({ comment }),
      })
      setcommentsupdate((prev) => !prev)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }
  }

  const post = !loading ? <Post post={data} /> : ''
  const comments = !loading
    ? commentsdata.map((comment) => {
        return <Comment comment={comment} />
      })
    : ''

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.blogholder}>
        {loading ? <p>Loading Posts...</p> : ''}
        {post}
      </div>
      <div className={styles.blogholder}></div>
      <div className={styles.commentdiv}>
        <h3>Comments</h3>
        {comments}
      </div>
      <div className={styles.commentdiv}>
        <h3>Add New Comment</h3>
        <NewComment
          uploadComment={uploadComment}
          setcommentsupdate={setcommentsupdate}
        />
      </div>
    </>
  )
}

function Post({ post }) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = DOMPurify.sanitize(post.text)

  return (
    <>
      <div className={styles.post}>
        <p className={styles.tag}>
          {new Date(post.datePublished).toDateString()}
        </p>
        <h3 className={styles.postheading}>{post.title}</h3>
        <p>
          Author:{' '}
          <span style={{ marginLeft: '30px' }} className={styles.tag}>
            {post.author.username}
          </span>
        </p>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }}
        ></div>
      </div>
    </>
  )
}

function Comment({ comment }) {
  return (
    <>
      <div className={styles.comment}>
        <p>{comment.comment}</p>
        <h4>{comment.commenter.username}</h4>
      </div>
    </>
  )
}

function NewComment({ uploadComment }) {
  const [comment, setComment] = useState('')

  return (
    <div className={styles.newcomment}>
      <div className={styles.newcomment2}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          onClick={() => {
            try {
              uploadComment(comment)
            } catch (error) {
              console.log(error)
            }

            setComment('')
          }}
        >
          Comment
        </button>
      </div>
    </div>
  )
}
