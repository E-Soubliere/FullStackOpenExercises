import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token
let config
const setToken = newToken => {
    token = `Bearer ${newToken}`
    config = {
        headers: { Authorization: token },
    }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { 
    setToken,
    getAll,
    create,
    remove,
}