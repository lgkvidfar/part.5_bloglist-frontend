/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { timedMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'TOGGLE_LIKE':
    const blog = action.data
    blogService.update(blog.id, { ...blog,
      'likes': blog.likes+1,
    })
    const blogToLike = state.find(b => b.id === blog.id)
    const likedBlog =  {
      ...blogToLike,
      likes: blogToLike.likes+1
    }
    return state.map(b => b.id !== blog.id ? b : likedBlog)
  case 'REMOVE_BLOG':
    const blogId = action.data.id
    return state.filter(b => b.id !== blogId)
  case 'NEW_BLOG':
    const newBlogs = [...state, action.data]
    return newBlogs.map(e => e)
  case 'FIND_BLOG':
    state.find(b => b.id === blogId)
    return state
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_COMMENT':
    const commentedState = [...state, action.data]
    const commentedBlog = commentedState.find(b => b.id === action.data.id)
    console.log(commentedBlog, 'commentedBlog')
    console.log(commentedState, 'commentedState')
    return commentedState.map(b => b.id !== action.data.id ? b : action.data)
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
      'type': 'NEW_BLOG',
      'data': newBlogReq
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

export const findBlog = (blog) => {
  return async dispatch => {
    const foundBlog = await blogService.getBlogByID(blog.id)
    dispatch({
      type: 'FIND_BLOG',
      data: foundBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const blogToRemove = await blogService.remove(blog.id)
    dispatch({
      type: 'TOGGLE_REMOVE',
      data: blogToRemove
    })
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createComment = (commentObject, blog) => {
  return async dispatch => {
    const newCommentReq = await blogService.addComment(commentObject, blog)
    console.log(newCommentReq,'newcommentreq')
    dispatch(timedMessage(`${commentObject.content} added to list of comments`, 2))
    dispatch({
      'type': 'NEW_COMMENT',
      'data': newCommentReq
    })
  }
}

export default blogReducer