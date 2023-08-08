import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`;
import getConfig from "./config";

const send = async (senderId, recipientId) => {
  const config = getConfig();

  const response = await axios.post(
    `${baseUrl}/${senderId}/friendRequests/sent/${recipientId}`,
    null,
    config
  );
  return response.data;
};

const get = async (userId, requestType) => {
  const config = getConfig();

  const response = await axios.get(
    `${baseUrl}/${userId}/friendRequests/${requestType}`,
    config
  );
  return response.data;
};

// Check if sender has already sent friend request to recipient; used in AddFriend page
const getOne = async (senderId, recipientId) => {
  const config = getConfig();

  const response = await axios.get(
    `${baseUrl}/${senderId}/friendRequests/sent/${recipientId}`,
    config
  );
  return response.data;
};

const cancel = async (userId, requestId) => {
  const config = getConfig();

  const response = await axios.delete(
    `${baseUrl}/${userId}/friendRequests/sent/${requestId}`,
    config
  );
  return response;
};

const close = async (userId, requestId) => {
  const config = getConfig();

  const response = await axios.delete(
    `${baseUrl}/${userId}/friendRequests/sent/${requestId}/close`,
    config
  );
  return response;
};

const resolve = async (userId, requestId, status) => {
  const config = getConfig();

  const response = await axios.put(
    `${baseUrl}/${userId}/friendRequests/received/${requestId}/${status}`,
    null,
    config
  );
  return response.data;
};

export default { send, get, getOne, cancel, close, resolve };
