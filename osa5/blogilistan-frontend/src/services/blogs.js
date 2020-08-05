import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const put = async (blogId, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.put(baseUrl + `/${blogId}`, blogObject, config)
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(baseUrl + `/${blogId}`, config)
}

export default {
  setToken,
  getAll,
  create,
  put,
  remove
}