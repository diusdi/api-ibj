const koneksi = require("../configs/database");
const { responseData, responseMessage } = require("../utils/responseHandler");

exports.getData = (response, statement) => {
  koneksi.query(statement, (err, rows) => {
    if (err) {
      return responseMessage(response, 500, ["Gagal menampilkan data", { error: err }]);
    }
    return responseData(response, 200, rows);
  });
};

exports.getDataById = (response, id) => {
  findCourse(response,null, null, id, 'SEARCH' )
};

exports.updateData = (response, id, data) => {
  findCourse(response, data.course_category_id, data, id, 'UPDATE');
};

exports.insertData = (response, data) => {
  findCourseCategory(response, data.course_category_id, data, "CREATE");
};

exports.deleteData = (response, searchStatement, deleteStatement, id) => {
  koneksi.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      koneksi.query(deleteStatement, id, (err, rows, field) => {
        if (err) {
          return response.status(500).json({ message: "Ada kesalahan", error: err });
        }

        responseMessage(response, 200, "Berhasil hapus data!");
      });
    } else {
      return response.status(404).json({ success: false, message: "Data tidak ditemukan!" });
    }
  });
};

const findCourseCategory = (response, course_category_id, data, action, id = null) => {
  const findStat = "SELECT * FROM course_categories WHERE id = ?";
  koneksi.query(findStat, course_category_id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }
    if (rows.length) {
      switch (action) {
        case "CREATE":
          createCourse(response, data);
          break;
        case "UPDATE":
          updateCourse(response, id, data);
          break;
      }
    } else {
      return responseMessage(response, 404, "Kategori kelas tidak ada");
    }
  });
};

const findCourse = (response, course_category_id, data, id, action) => {
  const searchStatement = "SELECT * FROM courses WHERE id = ?";
  koneksi.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    if (rows.length) {
      switch (action) {
        case 'SEARCH':
          responseData(response, 200, rows)
          break;
        case 'UPDATE':
          findCourseCategory(response, course_category_id, data, "UPDATE", id);
          break;
      }
    } else {
      return responseMessage(response, 404, "Kelas tidak ditemukan");
    }
  });
};

const createCourse = (response, data) => {
  const insertStatement = "INSERT INTO courses SET ?";
  koneksi.query(insertStatement, data, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", {error : err}])
    }

    return responseMessage(response, 200, "Berhasil menambahkan data!");
  });
};

const updateCourse = (response, id, data) => {
  const updateStatement = "UPDATE courses SET ? WHERE id = ?";
  koneksi.query(updateStatement, [data, id], (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", {error : err}])
    }

    return responseMessage(response, 200, "Berhasil update data!");
  });
};
