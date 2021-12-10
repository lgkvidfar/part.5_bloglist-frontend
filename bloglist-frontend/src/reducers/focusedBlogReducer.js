const focusedBlogReducer = (state = [], action) => {
  switch(action.type){
  case 'FOCUSED_BLOG':
    return action.data
  default:
    return state
  }
}

export const setFocusedBlog = (focusedBlog) => {
  return async dispatch => {
    dispatch({
      'type': 'FOCUSED_BLOG',
      'data': focusedBlog
    })
  }
}

export default focusedBlogReducer