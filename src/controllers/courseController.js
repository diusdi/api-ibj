const { insertData, getData, getDataById, updateData, deleteData } = require("../models/course");
const { validationResult } = require("express-validator");
const { responseData, responseMessage } = require("../utils/responseHandler");

exports.getAllCourses = (req, res, next) => {
  const querySql = "SELECT * FROM courses ";

  getData(res, querySql);
};

exports.getCourseById = (req, res, next) => {
  const querySearch = "SELECT * FROM courses WHERE id = ?";

  getDataById(res, querySearch, req.params.id);
};

exports.updateCourse = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM courses WHERE id = ?";
  const queryUpdate = "UPDATE courses SET ? WHERE id = ?";
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    updateData(res, querySearch, queryUpdate, req.params.id, data);
  }
};

exports.createCourse = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const querySql = "INSERT INTO courses SET ?";
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    insertData(res, querySearch, querySql, data);
  }
};

exports.deleteCourse = (req, res) => {
  const querySearch = 'SELECT * FROM courses WHERE id = ?';
  const queryDelete = 'DELETE FROM courses WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
