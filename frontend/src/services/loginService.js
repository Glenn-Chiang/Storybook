import axios from "axios"
const baseUrl = `${import.meta.env.VITE_BASE_URL}/login`;

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
} // Returns a user object: {token, username, displayName}

export default { login }