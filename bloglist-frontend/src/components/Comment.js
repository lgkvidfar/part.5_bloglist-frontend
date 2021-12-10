import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div id="comment" className="comment">
      <li>{comment}</li>
    </div>
  )
}

export default Comment