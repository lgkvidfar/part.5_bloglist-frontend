import loginService from '../services/login'
//import blogService from '../services/blogs'


const userReducer = (state = [], action) => {
  switch(action.type){
  case 'SET_CREDS':
    //blogService.setToken(loggedUser.token)
    console.log(action)
    return [action.data]
  case 'SET_TOKEN':
    return state
  case 'LOGIN_USER':
    return state
  case 'SET_USER':
    return [action.data]
  default:
    return state
  }
}

export const setCreds = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    const token = user.token
    console.log(token)
    dispatch({
      type: 'SET_CREDS',
      data: user,
    })
  }
}

export const setLoggedUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default userReducer