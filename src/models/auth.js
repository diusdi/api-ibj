const koneksi = require("../configs/database");
const { responseData, responseMessage } = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configs/secret");
const ip = require("ip");

exports.prosesLogin = (response, searchStatement, data) => {
  koneksi.query(searchStatement, data.email, (err, rows, field) => {
    if (err) {
      responseMessage(response, 500, "Ada kesalahan");
    }

    if (rows.length) {
      checkPassword(data, rows[0], response);
    } else {
      responseMessage(response, 404, "Email atau Password salah!");
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
      createAdmin(response, insertStatement, data);
    }
  });
};

const createAdmin = (response, statement, data) => {
  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(data.password, salt);
  data.password = hashPassword;

  koneksi.query(statement, data, (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Gagal registrasi", error: err });
    }
    responseMessage(response, 201, "Berhasil registrasi akun");
  });
};

const createAksesToken = (data, response) => {
  let query = "INSERT INTO akses_token SET ?;";

  koneksi.query(query, data, (err, rows, field) => {
    if (err) {
      responseMessage(response, 500, { message: "Ada kesalahan", error: err });
    }

    if (rows) {
      responseData(response, 201, data);
    }
  });
};

const checkPassword = (dataInput, dataDb, response) => {
  bcrypt.compare(dataInput.password, dataDb.password, function (err, result) {
    if (err) {
      return response.status(500).json({ message: "Ada yang salah", error: err });
    }

    if (result) {
      let token = jwt.sign({ result }, config.secret, {
        expiresIn: 60*30,
      });

      const data = {
        user_id: dataDb.id,
        token_akses: token,
        ip_address: ip.address(),
      };

      createAksesToken(data, response);
    } else {
      responseMessage(response, 404, "Email atau Password salah!");
    }
  });
};
