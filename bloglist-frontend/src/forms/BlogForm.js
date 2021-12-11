import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form className="basicForm" onSubmit={addBlog}>
        <Form.Control placeholder="title" name="blogTitleInput" id='inputTitle'  required={true}/>
        <Form.Control placeholder="author" name="blogAuthorInput" id='inputAuthor' required={true}/>
        <Form.Control placeholder="url" name="blogUrlInput" id='inputUrl' required={true}/> <br/>
        <Button variant="primary" type="submit" id='btnCreateBlog'>create</Button>
      </Form>
    </div>
  )

  return (
    <TheForm />
  )
}

export default BlogForm