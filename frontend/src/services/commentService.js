import axios from "axios";
const baseUrl = "http://localhost:3000/comments"

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const token = currentUser ? `Bearer ${currentUser.token}` : null;

const config = { headers: { Authorization: token } };

const getByPost = async (postId) => {
  const response = await axios.get(`${baseUrl}/posts/${postId}/comments`)
  return response.data
}

const create = async (postId, commentObject) => {
  const response = await axios.post(`${baseUrl}/posts/${postId}/comments`, commentObject, config)
  return response.data
}

const getByUser = async (userId) => {
  const response = await axios.get(
    `${baseUrl}/${userId}/comments?sortBy=datePosted&sortOrder=desc`
  );
  return response.data;
};

export default {getByPost, getByUser, create}