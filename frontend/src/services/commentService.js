import axios from "axios";
const baseUrl = "http://localhost:3000/posts"

const getAll = async (postId) => {
  const response = await axios.get(`${baseUrl}/${postId}/comments`)
  return response.data
}

const create = async (postId, commentObject) => {
  const response = await axios.post(`${baseUrl}/${postId}/comments`, commentObject)
  return response.data
}

export default {getAll, create}