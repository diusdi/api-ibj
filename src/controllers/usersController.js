const { insertData, getData, getDataById, updateData, deleteData } = require("../models/user");

exports.getAllUser = (req, res, next) => {
  const querySql = "SELECT id, name, email  FROM users ";

  getData(res, querySql);
};

exports.getUserById = (req, res, next) => {
  const querySearch = "SELECT id, name, email FROM users WHERE id = ?";

  getDataById(res, querySearch, req.params.id);
};

exports.updateUser = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM users WHERE id = ?";
  const queryUpdate = "UPDATE users SET ? WHERE id = ?";

  updateData(res, querySearch, queryUpdate, req.params.id, data);
};

exports.createUser = (req, res, next) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO users SET ?";

  insertData(res, querySql, data);
};

exports.deleteUser = (req, res) => {
  const querySearch = 'SELECT * FROM users WHERE id = ?';
  const queryDelete = 'DELETE FROM users WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
