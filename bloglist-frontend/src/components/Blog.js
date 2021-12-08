import React from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { toggleLikesOf } from '../reducers/blogReducer'
import { timedMessage } from '../reducers/notificationReducer'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleRemove = async (blog) => {
    try {
      if(window.confirm(`delete ${blog.title}?`)) {
        await blogService.remove(blog.id)
        let blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        //setBlogs(blogs)

        dispatch(timedMessage(`${blog.title} by ${blog.author} has been removed`), 3)
      }
    }catch(err) {
      dispatch(timedMessage('error', err.messsage))
    }
  }

  // const verifyRemove = (blog) => {
  //   if(user.username === blog.user.username){
  //     handleRemove(blog)
  //   } else {
  //     setMessage('error, not authorized to remove blog')
  //     setTimeout(() => setMessage(null), 3000)
  //   }
  // }

  const handleLikeChange = async (blog) => {
    await blogService.update(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes+1,
    })
    dispatch(toggleLikesOf(blog))
  }

  return (
    <div id="blogTitle" className="blog">
      <li >{blog.title} | {blog.likes || 0} likes</li>
      <Togglable className="showMore" id="ShowMore" buttonLabel="show more">
        <div>written by {blog.author} | <button id="likeButton" type="button" onClick={() => handleLikeChange(blog)}>like</button></div>
        <p>content long text content long text <br/>
         content long text content long text </p>
        <p>read more at <a href="google.com">url.com</a></p> <br/>
        <button type="button" onClick={() => handleRemove(blog)}>delete</button>
      </Togglable>
      <br/>
    </div>
  )
}

export default Blog