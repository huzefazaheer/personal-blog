import { useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './homepage'
import BlogPage from './blogpage/blogpage'
import Blog from './blogdetail/blogdetail'

export const api = 'http://localhost:8080/'

function App() {
  const jwt = useRef(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home jwt={jwt} />} />
          <Route path="/blog" element={<BlogPage jwt={jwt} />} />
          <Route path="/posts/:id" element={<Blog jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
