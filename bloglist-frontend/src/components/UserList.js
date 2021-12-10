import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {

  const current = useSelector(state => state.current.token)
  const users = useSelector(state => state.users)
  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      {current && <h2>users</h2>}
      <ul>
        {sortedUsers.map(u =>
          <User
            key={u.id}
            user={u}
          />
        )}
      </ul>
    </div>
  )
}

export default UserList