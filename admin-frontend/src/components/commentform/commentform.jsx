import { Editor } from 'primereact/editor'
import styles from './styles.module.css'
import Navbar from '../navbar/nav'
import { useState } from 'react'
import { apieditComment, apipushComment } from '../../util/commentsapi'

export default function CommentForm({
  oldcomment,
  showCommentForm,
  setShowCommentForm,
  jwt,
}) {
  const [comment, setComment] = useState(oldcomment.comment)

  return (
    <>
      <button onClick={() => setShowCommentForm(false)}>Exit</button>
      <Navbar />
      <div className={styles.editor}>
        <h2>
          {showCommentForm.newcomment ? 'Create Comment' : 'Edit Comment'}
        </h2>
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          name="posttitle"
          id="posttitle"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={async () => {
            if (showCommentForm.newcomment) {
              await apipushComment(jwt, comment, showCommentForm.blogid)
            } else {
              await apieditComment(jwt, showCommentForm.id, comment)
            }
            setShowCommentForm(false)
          }}
        >
          Create Post
        </button>
      </div>
    </>
  )
}
