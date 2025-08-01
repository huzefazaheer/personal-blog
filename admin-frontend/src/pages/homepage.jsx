import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from '../components/login/login'

export default function Home({ jwt }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      return
    }
    jwt.current = localStorage.getItem('jwt')
    navigate('/posts')
  }, [])

  return (
    <>
      <Login jwt={jwt} />
    </>
  )
}
