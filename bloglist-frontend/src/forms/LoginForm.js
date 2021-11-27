import React from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = ({ setUsername, username, setPassword, password, setUser, setMessage }) => {

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password,
      })
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setMessage(`welcome ${username}`)
      setTimeout(() => {setMessage(null)}, 3000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('did not manage login!',exception.message)
      setMessage('error: incorrect credentials')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input placeholder="username"
          type="username"
          id="inputUsername"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          required={true}
        /> <br/>
        <input
          placeholder="password"
          type="password"
          id="inputPassword"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          required={true}
        /><br/>
        <button id="btnLogin" type="submit" >login</button>
      </form>
    </div>

  )
}

export default LoginForm