import Navbar from '../components/navbar/nav'
import { getAllPosts, getPublicPosts } from '../util/postapi'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllUsers } from '../util/userapi'
import { useEffect } from 'react'

export default function Home({ jwt }) {
  const { type } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwt) {
      navigate('/')
    }
  }, [])

  let response
  switch (type) {
    case 'allposts':
      response = getAllPosts(jwt)
      break
    case 'users':
      response = getAllUsers(jwt)
      break
    default:
      response = getPublicPosts()
  }

  //   let posts
  //   if (data && data.length > 0) {
  //     posts = data.map((post) => {
  //       return <Blog data={post}></Blog>
  //     })
  //   }

  //   let response = <></>
  //   if (jwt) {
  //     response = (
  //       <>
  //         <Navbar></Navbar>
  //         {posts}
  //       </>
  //     )
  //   }

  return (
    <>
      <Navbar></Navbar>
    </>
  )
}
