const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.log('Error:', ...params);
};

module.exports = {
  info,
  error,
};
