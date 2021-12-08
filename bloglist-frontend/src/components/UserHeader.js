import React from 'react'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'

const UserHeader = () => {

  const handleLogout = () => {
    setTimeout(() => window.localStorage.clear(), 2000)
    setTimeout(() => window.location.reload(), 2000)
    blogService.setToken(null)
  }

  const user = useSelector(state => state.user[0])
  return (
    <div>
      <h3>
        logged in as {user.username} | <button id="btnLogout" type="button" onClick={handleLogout}>logout</button>
      </h3>
    </div>
  )
}

export default UserHeader