import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event, title, author, url) => {
    event.preventDefault()
    try{
      const blogObject = {
        'title': title,
        'author': author,
        'url': url
      }

      await blogService.create(blogObject).then(returnedBlog =>
        setBlogs(blogs.concat(returnedBlog))
      )

      setMessage(`${title} by ${author} added to list of blogs`)
      setTimeout(() => setMessage(null), 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }catch(exception) {
      setMessage('error',exception)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  return (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={event => addBlog(event, title, author, url)}>
        <input placeholder="title" id='inputTitle' value={title} onChange={handleTitleChange} required={true}/> <br/>
        <input placeholder="author"id='inputAuthor' value={author} onChange={handleAuthorChange} required={true}/> <br/>
        <input placeholder="url" id='inputUrl' value={url} onChange={handleUrlChange} required={true}/> <br/>
        <button type="submit" id='btnCreateBlog'>create</button>
      </form>
    </div>
  )
}

export default BlogForm