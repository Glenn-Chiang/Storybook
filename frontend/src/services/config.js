const getConfig = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser ? `Bearer ${currentUser.token}` : null;
  const config = { headers: { Authorization: token } };
  return config
}
export default getConfig

