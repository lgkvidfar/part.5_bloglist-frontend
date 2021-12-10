import axios from 'axios'

const baseUrl = '/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlogByID = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async newObject => {

  const response = await axios
    .post(baseUrl, newObject)
  return response.data
}

const update = async (id, newBlog) => {

  const request = await axios.put(`${baseUrl}/${id}`, newBlog)
  return request.data
}

const remove = async (id) => {

  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

const exports = {
  getAll,
  getBlogByID,
  create,
  update,
  remove,
}
export default exports