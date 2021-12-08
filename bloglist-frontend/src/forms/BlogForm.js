import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      'title': event.target.blogTitleInput.value,
      'author': event.target.blogAuthorInput.value,
      'url': event.target.blogUrlInput.value,
      'likes': 0
    }
    dispatch(createBlog(blogObject))
  }

  const TheForm = () => (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={addBlog}>
        <input placeholder="title" name="blogTitleInput" id='inputTitle'  required={true}/> <br/>
        <input placeholder="author" name="blogAuthorInput" id='inputAuthor' required={true}/> <br/>
        <input placeholder="url" name="blogUrlInput" id='inputUrl' required={true}/> <br/>
        <button type="submit" id='btnCreateBlog'>create</button>
      </form>
    </div>
  )

  return (
    <TheForm />
  )
}

export default BlogForm