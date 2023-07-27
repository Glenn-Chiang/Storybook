import axios from "axios"
const baseUrl = 'http://localhost:3000/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
} // Returns a user object: {token, username, displayName}

export default { login }