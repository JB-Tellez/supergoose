module.exports = () => {
  require('mongoose').connection.close();
};