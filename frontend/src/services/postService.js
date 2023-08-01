import axios from "axios";
import config from './config'
const baseUrl = "http://localhost:3000/posts";

const getAll = async (sortBy, sortOrder) => {
  const response = await axios.get(
    `${baseUrl}?sortBy=${sortBy}&sortOrder=${sortOrder}`,
    config
  );
  return response.data;
};

const getByUser = async (userId, sortBy, sortOrder) => {
  const response = await axios.get(
    `${baseUrl}/users/${userId}/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return response.data;
};

const getLikedByUser = async (userId, sortBy, sortOrder) => {
  const response = await axios.get(
    `${baseUrl}/users/${userId}/likedPosts?sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const edit = async (postId, updateData) => {
  const response = await axios.put(`${baseUrl}/${postId}/edit`, updateData, config);
  return response.data;
};

const like = async (postId) => {
  const response = await axios.put(
    `${baseUrl}/${postId}/likes`,
    { likes: 1 },
    config
  );
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axios.delete(`${baseUrl}/${postId}`, config);
  return response;
};

export default { getAll, getByUser, getLikedByUser, create, edit, like, deletePost };
