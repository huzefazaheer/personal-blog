import { useRef } from 'react'
import './App.css'
import Home from './pages/homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllPosts from './pages/allPosts/allposts'
import AllUsers from './pages/allusers/allusers'
import Comments from './pages/comments/comments'

export const api = 'https://personal-blog-ucmf.onrender.com/'

function App() {
  const jwt = useRef(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home jwt={jwt} />} />
          <Route path="/posts" element={<AllPosts jwt={jwt} />} />
          <Route path="/users" element={<AllUsers jwt={jwt} />} />
          <Route path="/comments" element={<Comments jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
