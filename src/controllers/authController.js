const { register, prosesLogin } = require("../models/auth");

exports.login = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT email, password FROM admin WHERE email = ? and password = ?;";
//   const queryInsert = "INSERT INTO admin SET ?;";

  prosesLogin(res, querySearch, data);
};

exports.register = (req, res, next) => {
  const data = { ...req.body };
  const querySearch = "SELECT email FROM admin WHERE email = ?;";
  const queryInsert = "INSERT INTO admin SET ?;";

  register(res, querySearch, queryInsert, data.email, data);
};
