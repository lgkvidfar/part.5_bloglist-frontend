import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = (user) => {

  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user && <h2>blogs</h2>}
      <Table striped>
        <tbody>
          {sortedBlogs.map(b =>
            <tr key={b.id}>
              <td>
                <Blog blog={b}/>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList