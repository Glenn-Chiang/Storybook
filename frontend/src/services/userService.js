import axios from "axios";
const baseUrl = "http://localhost:3000/users";

const create = async (username, displayName, password) => {
  const response = await axios.post(baseUrl, { username, displayName, password });
  return response.data;
};

const getPosts = async (userId, sortBy, sortOrder) => {
  const response = await axios.get(`${baseUrl}/${userId}/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`)
  return response.data
}

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

const updateUser = async (userId, updateData) => {
  const response = await axios.put(`${baseUrl}/${userId}`, updateData)
  return response.data
}

const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"))

export default { create, getPosts, getUser, getCurrentUser, updateUser };
