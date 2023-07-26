import axios from "axios";
const baseUrl = "http://localhost:3000/users";

const create = async (username, name, password) => {
  const response = await axios.post(baseUrl, { username, name, password });
  return response.data;
};

export default { create };
