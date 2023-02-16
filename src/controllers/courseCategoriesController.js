const { insertData, getData, getDataById, updateData, deleteData } = require("../models/courseCategory");

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
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const queryUpdate = "UPDATE course_categories SET ? WHERE id = ?";

  updateData(res, querySearch, queryUpdate, req.params.id, data);
};

exports.createCourseCategory = (req, res, next) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO course_categories SET ?";

  insertData(res, querySql, data);
};

exports.deleteCourseCategory = (req, res) => {
  const querySearch = 'SELECT * FROM course_categories WHERE id = ?';
  const queryDelete = 'DELETE FROM course_categories WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
