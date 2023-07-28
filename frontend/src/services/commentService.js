import axios from "axios";
const baseUrl = "http://localhost:3000/posts"

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const token = currentUser ? `Bearer ${currentUser.token}` : null;

const config = { headers: { Authorization: token } };

const getAll = async (postId) => {
  const response = await axios.get(`${baseUrl}/${postId}/comments`)
  return response.data
}

const create = async (postId, commentObject) => {
  const response = await axios.post(`${baseUrl}/${postId}/comments`, commentObject, config)
  return response.data
}

export default {getAll, create}