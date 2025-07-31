import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <p>Blog Manager</p>
      <ul>
        <li>
          <Link to="/home/posts">All Public Posts</Link>
        </li>
        <li>
          <Link to="/home/allposts">All Posts</Link>
        </li>
        <li>
          <Link to="/home/users">All Users </Link>
        </li>
      </ul>
    </nav>
  )
}
