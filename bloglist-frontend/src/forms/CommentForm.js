import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      'content': event.target.blogCommentInput.value
    }
    dispatch(createComment(commentObject, blog))
  }

  const TheForm = () => (
    <div>
      <h2>add a comment</h2>
      <Form onSubmit={addComment}>
        <Form.Control placeholder="share your thoughts" name="blogCommentInput" id='inputComment'  required={true}/> <br/>
        <Button type="submit" id='btnCreateComment'>post</Button>
      </Form>
    </div>
  )

  return (
    <TheForm />
  )
}

export default CommentForm