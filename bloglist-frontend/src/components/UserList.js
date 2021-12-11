import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const current = useSelector(state => state.current.token)
  const users = useSelector(state => state.users)
  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      {current && <h2>users</h2>}
      <Table striped>
        <tbody>
          {sortedUsers.map(u =>
            <tr key={u.id}>
              <td>
                <User user={u}/>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList