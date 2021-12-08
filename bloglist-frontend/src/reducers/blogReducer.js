/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { timedMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'TOGGLE_LIKE':
    const id = action.data.id
    const blogToChange = state.find(b => b.id === id)
    const changedBlog =  {
      ...blogToChange,
      likes: blogToChange.likes+1
    }
    return state.map(b => b.id !== id ? b : changedBlog)
  case 'REMOVE_BLOG':
    const blogId = action.data.id
    return state.filter(b => b.id !== blogId)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOG':
    return action.data
  default:
    return state
  }
}

//action creators
export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlogReq = await blogService.create(blogObject)
    dispatch(timedMessage(`${blogObject.title} added to list of blogs`, 2))
    dispatch({
      type: 'NEW_BLOG',
      data: newBlogReq
    })
  }
}

export const toggleLikesOf = (blog) => {
  return async dispatch => {
    const blogToChange= await blogService.update(blog.id)
    dispatch({
      type: 'TOGGLE_LIKE',
      data: blogToChange
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const blogToRemove = await blogService.remove(blog.id)
    dispatch({
      type: 'TOGGLE_LIKE',
      data: blogToRemove
    })
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}

export default blogReducer