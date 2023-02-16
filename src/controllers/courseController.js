const { insertData, getData, getDataById, updateData, deleteData } = require("../models/course");

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

  updateData(res, querySearch, queryUpdate, req.params.id, data);
};

exports.createCourse = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const querySql = "INSERT INTO courses SET ?";

  // console.log(data.category);
  insertData(res, querySearch, querySql, data);
};

exports.deleteCourse = (req, res) => {
  const querySearch = 'SELECT * FROM courses WHERE id = ?';
  const queryDelete = 'DELETE FROM courses WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
