import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './login/login'
import Signup from './signup/signup'

export const api = 'http://localhost:8080/'

export default function Home({ jwt }) {
  const [login, setLogin] = useState(true)

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      jwt.current = localStorage.getItem('jwt')
      navigate('/blog')
    }
  }, [])

  return (
    <>
      {login ? (
        <Login jwt={jwt} setLogin={setLogin} />
      ) : (
        <Signup jwt={jwt} setLogin={setLogin} />
      )}
      <button onClick={() => navigate('/blog')}>Continue as guest</button>
    </>
  )
}
