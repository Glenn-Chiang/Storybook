import axios from "axios";
const baseUrl = "http://localhost:3000/posts";

// let token = null;

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const token = currentUser ? `Bearer ${currentUser.token}` : null;

const config = { headers: { Authorization: token } };

const getAll = async (sortBy, sortOrder) => {
  const response = await axios.get(
    `${baseUrl}?sortBy=${sortBy}&sortOrder=${sortOrder}`,
    config
  );
  return response.data;
};


const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, create, update, deletePost };
