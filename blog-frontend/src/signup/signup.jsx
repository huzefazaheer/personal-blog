import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../homepage'

export default function Signup({ jwt, setLogin }) {
  const navigate = useNavigate()

  const [data, setData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function login(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const req = await fetch(api + 'auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await req.json()
    setLoading(false)
    if (typeof res == 'string') {
      jwt.current = res
      localStorage.setItem('jwt', res)
      navigate('/blog')
    } else setError('Error has occured')
  }

  return (
    <div>
      <form>
        <h2>Signup</h2>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <p id="formerror">{error}</p>
        <button
          id={!loading ? '' : 'loading'}
          type="submit"
          onClick={(e) => login(e)}
        >
          Signup
        </button>
      </form>
      <p>
        Don't have an account
        <span onClick={() => setLogin(false)}>Sign up</span>
      </p>
    </div>
  )
}
