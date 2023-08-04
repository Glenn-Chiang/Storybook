import axios from "axios";
import config from "./config";
const baseUrl = "http://localhost:3000/users";

const create = async (username, displayName, password) => {
  const response = await axios.post(baseUrl, {
    username,
    displayName,
    password,
  });
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getMatches = async (searchTerms, searchBy) => {
  const response = await axios.get(`${baseUrl}?searchTerms=${searchTerms}&searchBy=${searchBy}`);
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`, config);
  return response.data;
};

const updateUser = async (userId, updatedData) => {
  const response = await axios.put(`${baseUrl}/${userId}`, updatedData, config);
  return response.data;
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

const logout = () => localStorage.removeItem("currentUser");

const sendFriendRequest = async (userId) => {
  const response = await axios.post(`${baseUrl}/${userId}/friendRequests`, null, config)
  return response.data
}

const getFriendRequests = async (userId, requestType) => {
  const response = await axios.get(`${baseUrl}/${userId}/friendRequests/${requestType}`, config)
  return response.data
}

export default {
  create,
  getAll,
  getUser,
  getMatches,
  updateUser,
  getCurrentUser,
  logout,
  sendFriendRequest,
  getFriendRequests
};
