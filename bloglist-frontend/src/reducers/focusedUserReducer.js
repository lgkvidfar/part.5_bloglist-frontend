const focusedUserReducer = (state = [], action) => {
  switch(action.type){
  case 'FOCUSED_USER':
    return action.data
  default:
    return state
  }
}

export const setFocusedUser = (focusedUser) => {
  return async dispatch => {
    dispatch({
      'type': 'FOCUSED_USER',
      'data': focusedUser
    })
  }
}
export default focusedUserReducer