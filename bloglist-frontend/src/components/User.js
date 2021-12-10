import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setFocusedUser } from '../reducers/focusedUserReducer'
import Togglable from './Togglable'

const User = ({ user }) => {
  const dispatch = useDispatch()

  const handleClick = (user) => {
    dispatch(setFocusedUser(user))
  }

  return (
    <div id="user" className="user">
      <li > username: {user.username} | <Link to={`${user.username}`} onClick={() => handleClick(user)}> blogs: {user.blogs.length || 0 }</Link></li>
      <Togglable className="btnShowMore" id="ShowMore" buttonLabel="show more">
        <p>info about user info about user <br/>
         info about user info about user </p>
        <p>read more at <a href="google.com">url.com</a></p> <br/>
      </Togglable>
      <br/>
      {/* <Outlet /> */}
    </div>
  )
}

export default User