import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/nav'
import { api } from '../App'

export default function Home({ jwt }) {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      const req = await fetch(api + 'posts')
      const res = await req.json()
      setData(res)
    }
    if (jwt) {
      getData()
    }
  }, [jwt])

  let posts
  if (data && data.length > 0) {
    posts = data.map((post) => {
      return <Blog data={post}></Blog>
    })
  }

  let response = <></>
  if (jwt) {
    response = (
      <>
        <Navbar></Navbar>
        {posts}
      </>
    )
  }

  return response
}

function Blog({ data }) {
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </>
  )
}
