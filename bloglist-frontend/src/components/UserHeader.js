import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { timedMessage } from '../reducers/notificationReducer'

const UserHeader = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(timedMessage(`logging out ${user.username}`))
    blogService.setToken(null)
    setTimeout(() => window.localStorage.clear(), 2000)
    setTimeout(() => window.location.reload(), 2000)
  }

  const user = useSelector(state => state.current)

  return (
    <div>
      <p>
        logged in as {user.username || 'guest'} | {user.username && <button  id="btnLogout" type="button" onClick={handleLogout}>logout</button>}
      </p>
    </div>
  )
}

export default UserHeader