import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useMatch, useParams } from 'react-router-dom'
import { setFocusedBlog } from '../reducers/focusedBlogReducer'

const UsersBlogs = () => {
  const dispatch = useDispatch()

  const handleClick = (blog) => {
    dispatch(setFocusedBlog(blog))
  }

  let params = useParams()
  console.log(params)

  // const users = useSelector(state => state.users)
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === params.id)
  console.log(user)
  console.log(users)


  const blogs = useSelector(state => state.blogs)
  console.log(blogs)


  const userMatch = useMatch(`/users/${params.id}`)
  console.log(userMatch)

  if(blogs){
    return (
      <div>
        <h3>  {user.username} has added {blogs.length} blogs</h3>
        {blogs && <ul>
          {blogs.map(blog =>
            <li key={blog.id}> <Link to={`/blogs/${blog.id}`} onClick={() => handleClick(blog)}>{blog.title}</Link> | {blog.id} </li>)}
        </ul>}
      </div>
    )
  } else {
    return (
      <div> has not added any blogs yet</div>
    )
  }
}

export default UsersBlogs