import axios from "axios";
import config from "./config";
const baseUrl = "http://localhost:3000/users";

const send = async (userId) => {
  const response = await axios.post(
    `${baseUrl}/${userId}/friendRequests`,
    null,
    config
  );
  return response.data;
};

const get = async (userId, requestType) => {
  const response = await axios.get(
    `${baseUrl}/${userId}/friendRequests/${requestType}`,
    config
  );
  return response.data;
};

const cancel = async (userId, requestId) => {
  const response = await axios.delete(
    `${baseUrl}/${userId}/friendRequests/sent/${requestId}`,
    config
  );
  return response;
};

const close = async (userId, requestId) => {
  const response = await axios.delete(
    `${baseUrl}/${userId}/friendRequests/sent/${requestId}/close`,
    config
  );
  return response;
};

const resolve = async (userId, requestId, status) => {
  const response = await axios.put(
    `${baseUrl}/${userId}/friendRequests/received/${requestId}/${status}`,
    config
  );
  return response.data;
};

export default { send, get, cancel, close, resolve };
