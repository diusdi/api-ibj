const { insertData, getData, getDataById, updateData, deleteData } = require("../models/user");
const { validationResult } = require("express-validator");
const { responseData, responseMessage } = require("../utils/responseHandler");

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    updateData(res, querySearch, queryUpdate, req.params.id, data);
  }
};

exports.createUser = (req, res, next) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO users SET ?";
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    insertData(res, querySql, data);
  }
};

exports.deleteUser = (req, res) => {
  const querySearch = 'SELECT * FROM users WHERE id = ?';
  const queryDelete = 'DELETE FROM users WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
