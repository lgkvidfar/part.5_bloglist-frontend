import loginService from '../services/login'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const currentReducer = (state = [], action) => {
  switch(action.type){
  case 'SET_CREDS':
    return action.data
  case 'LOGIN_USER':
    return state
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const setCreds = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    dispatch({
      'type': 'SET_CREDS',
      'data': user,
    })
  }
}

export const setLoggedUser = (user) => {
  blogService.setToken(user.token)
  commentService.setToken(user.token)

  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default currentReducer