import axios from "axios";
const baseUrl = "http://localhost:3000/users";
import getConfig from "./config";

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
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

const updateUser = async (userId, updatedData) => {
  const config = getConfig();

  const response = await axios.put(`${baseUrl}/${userId}`, updatedData, config);
  return response.data;
};

const getFriends = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}/friends`)
  return response.data
}

const checkFriend = async (userId, friendId) => {
  const response = await axios.get(`${baseUrl}/${userId}/friends/${friendId}`)
  return response.data
}

const unfriend = async (userId, friendId) => {
  const config = getConfig();

  const response = await axios.delete(`${baseUrl}/${userId}/friends/${friendId}`, config)
  return response
}

const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

const logout = () => localStorage.removeItem("currentUser");

export default {
  create,
  getAll,
  getUser,
  getMatches,
  updateUser,
  getFriends,
  checkFriend,
  unfriend,
  getCurrentUser,
  logout,
};
