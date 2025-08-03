import { useEffect, useState } from 'react'
import { api } from '../homepage'
import Navbar from '../navbar/navbar'
import styles from './blog.module.css'
import DOMPurify from 'dompurify'
import { useNavigate } from 'react-router-dom'
export default function BlogPage({ jwt }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function getData() {
      const res = await fetch(api + 'posts')
      const dat = await res.json()
      setData(dat)
      setLoading(false)
    }
    getData()
  }, [])

  const posts = !loading
    ? data.map((post) => {
        return <Post post={post} />
      })
    : null

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.blogholder}>
        <h1 className={styles.toppicksh1}>Todays Top Picks</h1>
        {loading ? <p>Loading Posts...</p> : ''}
        {posts}
      </div>
    </>
  )
}

function Post({ post }) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = DOMPurify.sanitize(post.text)
  const ptag = tempDiv.querySelector('p')
  if (ptag.textContent.length > 250) {
    ptag.textContent = ptag.textContent.substring(0, 300) + '...'
  }
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.post}>
        <h3 className={styles.postheading}>{post.title}</h3>
        <div className={styles.tagholder}>
          <p className={styles.tag}>{post.author.username}</p>
          <p className={styles.tag}>
            {new Date(post.datePublished).toDateString()}
          </p>
        </div>
        <div className={styles.text}>{ptag.textContent}</div>
        <button onClick={() => navigate('/posts/' + post.id)}>Read More</button>
      </div>
    </>
  )
}
