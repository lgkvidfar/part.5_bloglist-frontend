import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

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
      <form onSubmit={addComment}>
        <input placeholder="content" name="blogCommentInput" id='inputComment'  required={true}/> <br/>
        <button type="submit" id='btnCreateComment'>post</button>
      </form>
    </div>
  )

  return (
    <TheForm />
  )
}

export default CommentForm