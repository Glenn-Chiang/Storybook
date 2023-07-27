import axios from "axios";
const baseUrl = "http://localhost:3000/users";

const create = async (username, displayName, password) => {
  const response = await axios.post(baseUrl, { username, displayName, password });
  return response.data;
};

export default { create };
