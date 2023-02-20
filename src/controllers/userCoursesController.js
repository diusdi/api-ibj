const { insertData, getData, getDataById, updateData, deleteData } = require("../models/userCourse");

exports.getAllUserCourse = (req, res, next) => {
  const querySql = "SELECT user_courses.id, users.name, courses.title FROM users INNER JOIN user_courses ON users.id = user_courses.user_id INNER JOIN courses ON user_courses.course_id = courses.id; ";

  getData(res, querySql);
};

exports.getUserCourseById = (req, res, next) => {
    const querySearch = "SELECT user_courses.id, users.name, courses.title FROM users INNER JOIN user_courses ON users.id = user_courses.user_id INNER JOIN courses ON user_courses.course_id = courses.id WHERE user_courses.id = ?; ";

  getDataById(res, querySearch, req.params.id);
};

exports.updateUserCourse = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM user_courses WHERE id = ?";
  const queryUpdate = "UPDATE user_courses SET ? WHERE id = ?";

  updateData(res, querySearch, queryUpdate, req.params.id, data);
};

exports.createUserCourse = (req, res, next) => {
  const data = { ...req.body };
//   const querySearch = "SELECT * FROM course_categories WHERE id = ?";
  const querySql = "INSERT INTO user_courses SET ?";

  // console.log(data.category);
  insertData(res, querySql, data);
};

exports.deleteUserCourse = (req, res) => {
  const querySearch = 'SELECT * FROM user_courses WHERE id = ?';
  const queryDelete = 'DELETE FROM user_courses WHERE id = ?';

  deleteData(res, querySearch, queryDelete, req.params.id);
};
