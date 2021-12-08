import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './forms/BlogForm'
import blogService from './services/blogs'
import LoginForm from './forms/LoginForm'
import Notification from './components/Notification'
import UserHeader from './components/UserHeader'
import Footer from './components/Footer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  })

  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const user = useSelector(state => state.user[0])

  return (
    <Router>
      {user && <UserHeader setMessage={setMessage}/>}
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/blogs">blogs</Link>
            </li>
            {!user && <li>
              <Link to="/login">login</Link>
            </li>}
            <li>
              <Link to="/addblog">add blog</Link>
            </li>
          </ul>
        </nav>
        <Notification setMessage={setMessage} message={message} />
        <Routes>
          <Route path="/login" element={<LoginForm
            message={message} setMessage={setMessage}
          /> } />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/addblog" element={<BlogForm  />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
export default App