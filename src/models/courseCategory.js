const koneksi = require("../configs/database");
const { responseData, responseMessage } = require("../utils/responseHandler");

exports.getData = (response, statement) => {
  koneksi.query(statement, (err, rows) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }
    return responseData(response, 200, rows);
  });
};

exports.getDataById = (response, searchStatement, id) => {
  koneksi.query(searchStatement, [id], (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    if (rows.length) {
      return responseData(response, 200, rows);
    } else {
      return responseMessage(response, 500, "Kategori tidak ditemukan");
    }
  });
};

exports.updateData = (response, searchStatement, updateStatement, id, data) => {
  koneksi.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    if (rows.length) {
      koneksi.query(updateStatement, [data, id], (err, rows, field) => {
        if (err) {
          return responseMessage(response, 500, ["Gagal update data", { error: err }]);
        }

        return responseMessage(response, 200, "Berhasil update data!");
      });
    } else {
      return responseMessage(response, 404, "Kategori tidak ditemukan!");
    }
  });
};

exports.insertData = (response, statement, data) => {
  koneksi.query(statement, data, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Gagal menambahkan data", { error: err }]);
    }
    return responseMessage(response, 201, "Berhasil menambahkan data!");
  });
};

exports.deleteData = (response, searchStatement, deleteStatement, id) => {
  koneksi.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
    }

    if (rows.length) {
      koneksi.query(deleteStatement, id, (err, rows, field) => {
        if (err) {
          return responseMessage(response, 500, ["Ada kesalahan", { error: err }]);
        }

        return responseMessage(response, 200, "Berhasil hapus data!");
      });
    } else {
      return responseMessage(response, 404, "Kategori tidak ditemukan");
    }
  });
};
