const { insertData, getData, getDataById, updateData, deleteData } = require("../models/courseCategory");
const { responseData, responseMessage } = require("../utils/responseHandler");

const { validationResult } = require("express-validator");

exports.getAllCourseCategory = (req, res, next) => {
  const querySql = "SELECT * FROM course_categories ";

  getData(res, querySql);
};

exports.getCourseCategoryById = (req, res, next) => {
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";

  getDataById(res, querySearch, req.params.id);
};

exports.updateCourseCategory = (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const queryUpdate = "UPDATE course_categories SET ? WHERE id = ?";

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    updateData(res, querySearch, queryUpdate, req.params.id, data);
  }
};

exports.createCourseCategory = (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);
  const querySql = "INSERT INTO course_categories SET ?";

  if (!errors.isEmpty()) {
    responseMessage(res, 400, errors);
  }else{
    insertData(res, querySql, data);
  }
};

exports.deleteCourseCategory = (req, res) => {
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const queryDelete = "DELETE FROM course_categories WHERE id = ?";

  deleteData(res, querySearch, queryDelete, req.params.id);
};
