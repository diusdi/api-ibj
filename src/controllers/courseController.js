const { insertData, getData, getDataById, updateData, deleteData } = require("../models/course");
const { validationResult } = require("express-validator");
const { responseData, responseMessage } = require("../utils/responseHandler");

exports.getAllCourses = (req, res, next) => {
  const querySql = "SELECT * FROM courses ";

  getData(res, querySql);
};

exports.getCourseById = (req, res) => {
  getDataById(res, req.params.id);
};

exports.updateCourse = (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  } else {
    updateData(res, req.params.id, data);
  }
};

exports.createCourse = (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  } else {
    insertData(res, data);
  }
};

exports.deleteCourse = (req, res) => {
  const querySearch = "SELECT * FROM courses WHERE id = ?";
  const queryDelete = "DELETE FROM courses WHERE id = ?";

  deleteData(res, querySearch, queryDelete, req.params.id);
};
