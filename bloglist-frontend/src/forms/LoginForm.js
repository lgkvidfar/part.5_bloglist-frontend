import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { timedMessage } from '../reducers/notificationReducer'
import { setCreds } from '../reducers/currentReducer'
import { useNavigate } from 'react-router'
import { Form, Button } from 'react-bootstrap'


const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      navigate('/blogs')

    } catch (exception) {
      dispatch(timedMessage('error: incorrect credentials'))
    }
  }

  return (
    <div>
      <h2>log in to blog app</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control placeholder="username"
            type="username"
            id="inputUsername"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            required={true}
          /> <br/>
          <Form.Control
            placeholder="password"
            type="password"
            id="inputPassword"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            required={true}
          /><br/>
          <Button variant="primary" id="btnLogin" type="submit" >login</Button>
        </Form.Group>
      </Form>
    </div>

  )
}

export default LoginForm