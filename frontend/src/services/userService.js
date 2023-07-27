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

export default { create, getPosts };
