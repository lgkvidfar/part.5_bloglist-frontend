import React from 'react'
import blogService from '../services/blogs'

const UserHeader = ({ user, setMessage }) => {

  const handleLogout = () => {
    setMessage(`logging out ${user.username}`)
    setTimeout(() => window.localStorage.clear(), 2000)
    setTimeout(() => window.location.reload(), 2000)
    blogService.setToken(null)
  }
  return (
    <div>
      <h3>
        logged in as {user.username} | <button id="btnLogout" type="button" onClick={handleLogout}>logout</button>
      </h3>
    </div>
  )
}

export default UserHeader