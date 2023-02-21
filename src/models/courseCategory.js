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

exports.getDataById = (response, searchStatement, id) => {
  koneksi.query(searchStatement, [id], (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      responseData(response, 200, rows);
    } else {
      return response.status(404).json({ message: "Kategori tidak ditemukan!", success: false });
    }
  });
};

exports.updateData = (response, searchStatement, updateStatement, id, data) => {
  koneksi.query(searchStatement, id, (err, rows, field) => {
      if (err) {
          return response.status(500).json({ message: 'Ada kesalahan', error: err });
      }

      if (rows.length) {
          koneksi.query(updateStatement, [data, id], (err, rows, field) => {
              if (err) {
                  return response.status(500).json({ message: 'Ada kesalahan', error: err });
              }

              responseMessage(response, 200, 'Berhasil update data!');
          });
      } else {
          return response.status(404).json({ message: 'Kategori tidak ditemukan!', success: false });
      }
  });
};

exports.insertData = (response, statement, data) => {
  koneksi.query(statement, data, (err, rows, field) => {
    if (err) {
      return response.status(500).json({ message: "Gagal menambahkan data", error: err });
    }
    responseMessage(response, 201, "Berhasil menambahkan data!");
  });
};

exports.deleteData = (response, searchStatement, deleteStatement, id) => {
  koneksi.query(searchStatement, id, (err, rows, field) => {
      if (err) {
          return response.status(500).json({ message: 'Ada kesalahan', error: err });
      }

      if (rows.length) {
          koneksi.query(deleteStatement, id, (err, rows, field) => {
              if (err) {
                  return response.status(500).json({ message: 'Ada kesalahan', error: err });
              }

              responseMessage(response, 200, 'Berhasil hapus data!');
          });
      } else {
          return response.status(404).json({ success: false, message: 'Kategori tidak ditemukan!' });
      }
  });
};
