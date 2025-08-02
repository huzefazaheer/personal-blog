import { useRef } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './homepage'

export const api = 'http://localhost:8080/'

function App() {
  const jwt = useRef(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
