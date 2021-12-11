import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes,Route, useParams, useMatch } from 'react-router-dom'
import CommentForm from '../forms/CommentForm'
import Comment from './Comment'
import { initializeBlogs, toggleLikesOf } from '../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  let params = useParams()
  console.log(params)

  // const users = useSelector(state => state.users)
  const blog = useSelector(state => state.blogs).find(b => b.id === params.id)
  console.log(blog)


  const blogMatch = useMatch(`/blogs/${params.id}`)
  console.log(blogMatch)
  // const user = userMatch
  //   ? users.find(user => user.username === userMatch.params.username)
  //   : null

  const handleLikeChange = () => {
    dispatch(toggleLikesOf(blog))
  }


  return (
    <div id="blogTitle" className="blog">
      <h3 >{blog.title}</h3>
      <div>written by {blog.author} | {blog.likes || 0} likes<button className="btn btn-block btn-primary" onClick={() => handleLikeChange(blog)}><i className="fa fa-thumbs-up">like</i> </button></div>
      <p>more detailed content add timestamp fun stuff and fact ahhaha </p>
      <p>read more at <a href="google.com">url.com</a></p> <br/>
      <br/>
      <Routes>
        <Route path="/" element={<CommentForm blog={blog}/>}/>
      </Routes>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(c =>
          <Comment comment={c} key={c}/>
        )}
      </ul>

    </div>
  )
}

export default BlogInfo