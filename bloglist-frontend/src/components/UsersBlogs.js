import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setFocusedBlog } from '../reducers/focusedBlogReducer'

const UsersBlogs = ({ user }) => {
  const dispatch = useDispatch()

  const blogs =  useSelector(state => state.focusedUser.blogs)
  const username =  user.username

  const handleClick = (blog) => {
    dispatch(setFocusedBlog(blog))
  }

  if(blogs){
    return (
      <div>
        <h3> {username} has added {blogs.length} blogs</h3>
        {blogs && <ul>
          {blogs.map(blog =>
            <li key={blog.id}> <Link to={`/blogs/${blog.id}`} onClick={() => handleClick(blog)}>{blog.title}</Link> | {blog.id} </li>)}
        </ul>}
      </div>
    )
  } else {
    return (
      <div>{username} has not added any blogs yet</div>
    )
  }
}

export default UsersBlogs