const { insertData, getData, getDataById, updateData, deleteData } = require("../models/userCourse");

exports.getAllUserCourse = (req, res, next) => {
  const querySql = "SELECT user_courses.id, users.name, courses.title FROM users INNER JOIN user_courses ON users.id = user_courses.user_id INNER JOIN courses ON user_courses.course_id = courses.id; ";

  getData(res, querySql);
};

exports.getUserCourseById = (req, res, next) => {
  getDataById(res, req.params.id);
};

exports.updateUserCourse = (req, res, next) => {
  const data = { ...req.body };
  const queryUpdate = "UPDATE user_courses SET ? WHERE id = ?";

  updateData(res, req.params.id, data);
};

exports.createUserCourse = (req, res, next) => {
  const data = { ...req.body };
  insertData(res, data);
};

exports.deleteUserCourse = (req, res) => {
  deleteData(res, req.params.id);
};
