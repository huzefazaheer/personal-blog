import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <p>Blog Manager</p>
      <ul>
        <li>
          <Link to="/posts">All Posts</Link>
        </li>
        <li>
          <Link to="/publicposts">All Public Posts</Link>
        </li>
        <li>
          <Link to="/users">All Users </Link>
        </li>
      </ul>
    </nav>
  )
}
