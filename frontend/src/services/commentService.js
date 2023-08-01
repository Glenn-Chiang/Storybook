import axios from "axios";
import config from "./config";
const baseUrl = "http://localhost:3000/comments"

const getByPost = async (postId) => {
  const response = await axios.get(`${baseUrl}/posts/${postId}/comments`)
  return response.data
}

const getByUser = async (userId) => {
  const response = await axios.get(
    `${baseUrl}/users/${userId}/comments?sortBy=datePosted&sortOrder=desc`
  );
  return response.data;
};

const create = async (postId, commentObject) => {
  const response = await axios.post(`${baseUrl}/posts/${postId}/comments`, commentObject, config)
  return response.data
}

const update = async (commentId, updatedComment) => {
  const response = await axios.put(`${baseUrl}/${commentId}`, updatedComment, config)
  return response.data
}

const remove = async (commentId) => {
  const response = await axios.delete(`${baseUrl}/${commentId}`, config)
  return response.data
}

export default {getByPost, getByUser, create, update, remove }