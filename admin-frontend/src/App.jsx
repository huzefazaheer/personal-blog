import { useState } from 'react'
import './App.css'
import Login from './components/login/login'
import Home from './pages/homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const api = 'http://localhost:8080/'

function App() {
  const [jwt, setjwt] = useState(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login jwt={jwt} setjwt={setjwt} />} />
          <Route path="/home" element={<Home jwt={jwt} />} />
          <Route path="/home/:type" element={<Home jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
