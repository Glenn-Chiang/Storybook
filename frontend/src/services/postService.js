import axios from "axios";
const baseUrl = "http://localhost:3000/posts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

export default { getAll, create, update, deletePost };
