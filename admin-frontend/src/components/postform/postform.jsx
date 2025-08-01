import { Editor } from 'primereact/editor'
import styles from './styles.module.css'
import Navbar from '../navbar/nav'
import { useState } from 'react'
import { apieditPost, apipushPost } from '../../util/postapi'

export default function PostForm({
  oldtitle,
  oldtext,
  showPostForm,
  setShowPostForm,
  jwt,
}) {
  const [title, setTitle] = useState(oldtitle)
  const [text, setText] = useState(oldtext)

  return (
    <>
      <button onClick={() => setShowPostForm(false)}>Exit</button>
      <Navbar />
      <div className={styles.editor}>
        <h2>{showPostForm.newpost ? 'Create New Post' : 'Edit Post'}</h2>
        <label htmlFor="posttitle">Post Title</label>
        <input
          type="text"
          name="posttitle"
          id="posttitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Editor
            className={styles.inputtext}
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
          ></Editor>
        </div>
        <button
          onClick={async () => {
            if (showPostForm.newpost) {
              await apipushPost(jwt, title, text)
            } else {
              await apieditPost(jwt, showPostForm.id, title, text)
            }
            setShowPostForm(false)
          }}
        >
          Create Post
        </button>
      </div>
    </>
  )
}
