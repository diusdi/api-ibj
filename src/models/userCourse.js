const koneksi = require("../configs/database");
const { responseData, responseMessage } = require("../utils/responseHandler");

exports.getData = (response, statement) => {
  koneksi.query(statement, (err, rows) => {
    if (err) {
      return response.status(500).json({ message: "Gagal menampilkan data", error: err });
    }
    responseData(response, 200, rows);
  });
};

exports.getDataById = (response, id) => {
  findUserCourse(response, id, "SEARCH");
};

exports.updateData = (response, id, data) => {
  findUserCourse(response, id, "UPDATE");
  findUser(response, data.user_id);
  findCourse(response, data.course_id);
  updateUserCourse(response, id, data);
};

exports.insertData = (response, data) => {
  findUser(response, data.user_id);
  findCourse(response, data.course_id);
  createUserCourse(response, data);
};

exports.deleteData = (response, id) => {
  findUserCourse(response, id, "DELETE");
  deleteUserCourse(response, id);
};

const findUser = (response, id) => {
  const queryUser = "SELECT * FROM users WHERE id = ?";
  findQuery(response, queryUser, id, "Peserta");
};

const findCourse = (response, id) => {
  const courseQuery = "SELECT * FROM courses WHERE id = ?";
  findQuery(response, courseQuery, id, "Kelas");
};

const findQuery = (response, findQuery, id, findName) => {
  koneksi.query(findQuery, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }
    if (rows.length) {
      return;
    } else {
      return responseMessage(response, 404, `${findName} tidak ada`);
    }
  });
};

const findUserCourse = (response, id, action) => {
  const userCourseQuery = "SELECT user_courses.id, users.name, courses.title FROM users INNER JOIN user_courses ON users.id = user_courses.user_id INNER JOIN courses ON user_courses.course_id = courses.id WHERE user_courses.id = ?; ";

  koneksi.query(userCourseQuery, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    if (rows.length) {
      switch (action) {
        case "SEARCH":
          return responseData(response, 200, rows);
        case "UPDATE":
          return;
        case "DELETE":
          return;
      }
    } else {
      return responseMessage(response, 404, "Akses kelas peserta tidak ditemukan");
    }
  });
};

const createUserCourse = (response, data) => {
  const insertQuery = "INSERT INTO user_courses SET ?";
  koneksi.query(insertQuery, data, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, "Gagal menambahkan data");
    } else {
      return responseMessage(response, 201, "Berhasil menambahkan data!");
    }
  });
};

const updateUserCourse = (response, id, data) => {
  const updateStatement = "UPDATE user_courses SET ? WHERE id = ?";
  koneksi.query(updateStatement, [data, id], (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    return responseMessage(response, 200, "Berhasil update data!");
  });
};

const deleteUserCourse = (response, id) => {
  const deleteQuery = "DELETE FROM user_courses WHERE id = ?";
  koneksi.query(deleteQuery, id, (err) => {
    if (err) {
      return responseMessage(response, 500, ["Gagal Menghapus data", { error: err }]);
    }
    responseMessage(response, 201, "Berhasil menghapus data!");
  });
};
