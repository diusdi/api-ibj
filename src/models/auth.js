const koneksi = require("../configs/database");
const { responseData, responseMessage } = require("../utils/responseHandler");
const bcrypt = require("bcrypt");

exports.prosesLogin = (response, searchStatement, data) => {
  koneksi.query(searchStatement, data, (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      return response.status(404).json({ message: "Email sudah digunakan!", success: false });
    } else {
      return response.status(404).json({ message: "Email/Password salah!", success: false });
      // insertData(response, insertStatement, data);
    }
  });
};

exports.register = (response, searchStatement, insertStatement, email, data) => {
  koneksi.query(searchStatement, [email], (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      return response.status(404).json({ message: "Email sudah digunakan!", success: false });
    } else {
      insertData(response, insertStatement, data);
    }
  });
};

const insertData = (response, statement, data) => {
  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(data.password, salt);
  data.password = hashPassword;

  koneksi.query(statement, data, (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Gagal menambahkan data", error: err });
    }
    responseMessage(response, 201, "Berhasil menambahkan data!");
  });
};
