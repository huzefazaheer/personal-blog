import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './login/login'

export const api = 'https://personal-blog-t7ww.onrender.com/'

export default function Home({ jwt }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      return
    }
    jwt.current = localStorage.getItem('jwt')
  }, [])

  return (
    <>
      <Login jwt={jwt} />
    </>
  )
}
