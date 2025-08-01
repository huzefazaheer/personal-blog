import { Editor } from 'primereact/editor'
import styles from './styles.module.css'
import Navbar from '../navbar/nav'
import { useState } from 'react'

export default function PostForm({
  oldtitle,
  oldtext,
  newPost,
  setShowPostForm,
}) {
  const [title, setTitle] = useState(oldtitle)
  const [text, setText] = useState(oldtext)

  return (
    <>
      <button onClick={() => setShowPostForm(false)}>Exit</button>
      <Navbar />
      <div className={styles.editor}>
        <h2>{newPost ? 'Create New Post' : 'Edit Post'}</h2>
        <label htmlFor="posttitle" onChange={(e) => setTitle(e.target.value)}>
          Post Title
        </label>
        <input type="text" name="posttitle" id="posttitle" value={title} />
        <div>
          <Editor
            className={styles.inputtext}
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
          ></Editor>
        </div>
        <button
          onClick={() => {
            console.log(text)
            setShowPostForm(false)
          }}
        >
          Create Post
        </button>
      </div>
    </>
  )
}
