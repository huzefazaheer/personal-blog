import { useRef } from 'react'
import './App.css'
import Home from './pages/homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllPosts from './pages/allPosts/allposts'
import AllPublicPosts from './pages/allPublicPosts/allposts'
import AllUsers from './pages/allusers/allusers'

export const api = 'http://localhost:8080/'

function App() {
  const jwt = useRef(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home jwt={jwt} />} />
          <Route path="/posts" element={<AllPosts jwt={jwt} />} />
          <Route path="/publicposts" element={<AllPublicPosts jwt={jwt} />} />
          <Route path="/users" element={<AllUsers jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
