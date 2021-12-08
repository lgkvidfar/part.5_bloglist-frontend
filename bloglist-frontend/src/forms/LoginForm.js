import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { timedMessage } from '../reducers/notificationReducer'
import { setCreds } from '../reducers/userReducer'


const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(setCreds({ username, password }))
      dispatch(timedMessage(`welcome ${username}`))
    } catch (exception) {
      console.log('did not manage login!',exception.message)
      dispatch(timedMessage('error: incorrect credentials'))
    }
  }

  return (
    <div>
      <h2>blog app</h2>
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