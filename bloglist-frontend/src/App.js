import React, { useEffect } from 'react'

import {
  Routes,
  Route,
  Link
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import UserList from './components/UserList'
import UsersBlogs from './components/UsersBlogs'
import BlogForm from './forms/BlogForm'
import LoginForm from './forms/LoginForm'
import Notification from './components/Notification'
import UserHeader from './components/UserHeader'
import Footer from './components/Footer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/currentReducer'
import HomePage from './components/HomePage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
    }
  }, [])

  const userToken = useSelector(state => state.current.token)

  return (
    <div className="container">
      <UserHeader />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/blogs">blogs</Link>
            </Nav.Link>
            {!userToken && <Nav.Link href="#" as="span">
              <Link to="/login">login</Link>
            </Nav.Link>}

            <Nav.Link href="#" as="span">
              <Link to="/addblog">add blog</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification  />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginForm
        /> } />
        <Route path="/users/*" element={<UserList />} />
        <Route path="/users/:id" element={<UsersBlogs />} />
        <Route path="/blogs/*" element={<BlogList />} />
        <Route path="/blogs/:id/*" element={<BlogInfo />}/>
        <Route path="/addblog" element={<BlogForm  />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App