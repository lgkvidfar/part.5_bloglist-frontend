import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = (user) => {

  const blogs = useSelector(state => state.blogs)
  console.log(blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user && <h2>blogs</h2>}
      <ul>
        {sortedBlogs.map(b =>
          <Blog
            key={b.id}
            blog={b}
          />
        )}
      </ul>
    </div>
  )
}

export default BlogList