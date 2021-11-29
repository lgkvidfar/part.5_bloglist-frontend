import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './forms/LoginForm'
import BlogForm from './forms/BlogForm'
import Notification from './components/Notification'
import UserHeader from './components/UserHeader'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification setMessage={setMessage} message={message} />
      {user && <UserHeader user={user} setMessage={setMessage}/>}
      {user && <Togglable id="btnAddBlog" buttonLabel='add a new blog'>
        <BlogForm
          setBlogs={setBlogs} blogs={blogs}
          setMessage={setMessage}
        />
      </Togglable>}
      {!user && <h2>blog app</h2>}
      {user && <h2>blogs</h2>}
      <ul className="blogsList">
        {blogs.map(blog =>
          <Blog user={user} key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
        )}
      </ul>
      {!user && <Togglable id="btnOpenLogin" buttonLabel="log in">
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          user={user} setUser={setUser}
          message={message} setMessage={setMessage}
        /> </Togglable>
      }
      <Footer />
    </div>
  )
}
export default App