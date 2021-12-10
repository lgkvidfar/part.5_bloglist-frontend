import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import{ composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import currentReducer from './reducers/currentReducer'
import focusedUserReducer from './reducers/focusedUserReducer'
import focusedBlogReducer from './reducers/focusedBlogReducer'

const reducers = combineReducers({
  focusedBlog: focusedBlogReducer,
  focusedUser: focusedUserReducer,
  current: currentReducer,
  users: userReducer,
  blogs: blogReducer,
  notifications: notificationReducer
})

const store = createStore(reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store
