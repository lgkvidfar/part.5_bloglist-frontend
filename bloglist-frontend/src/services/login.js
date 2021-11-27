import axios from 'axios'

const baseUrl = '/login'

const login = async (loginCred) => {
  const response = await axios.post(baseUrl, loginCred)
  window.localStorage.setItem(
    'loggedBlogger', JSON.stringify(response.data)
  )
  return response.data
}

const exports = { login }
export default exports