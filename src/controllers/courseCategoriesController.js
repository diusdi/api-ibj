const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getCategoriesCourse(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM course_categories
                `,
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil mengambil data",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  getCategoryCourseByID(req, res) {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT * FROM course_categories WHERE id = ?;
        `,[id],
        function (error, results) {
          if (error) {
            throw error;
          }
          else if (results.length !== 0) {
            res.send({
              success: true,
              message: "Berhasil mengambil data",
              data: results,
            });
          }
          res.send({
            success: true,
            message: "Data tidak ditemukan",
            data: [],
          });
        }
      );
      connection.release();
    });
  },
  addCategoriesCourse(req, res) {
    const data = {
      name: req.body.name,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO course_categories SET ?;
                `,
        [data],
        function (error, result) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil Menambahkan Data!",
            data: result,
          });
        }
      );
      connection.release();
    });
  },
  // editCategoryCourse(req,res){
  //     let dataEdit = {
  //         karyawan_nama : req.body.nama,
  //         karyawan_umur : req.body.umur,
  //         karyawan_alamat : req.body.alamat,
  //         karyawan_jabatan : req.body.jabatan
  //     }
  //     let id = req.body.id
  //     pool.getConnection(function(err, connection) {
  //         if (err) throw err;
  //         connection.query(
  //             `
  //             UPDATE tabel_karyawan SET ? WHERE karyawan_id = ?;
  //             `
  //         , [dataEdit, id],
  //         function (error, results) {
  //             if(error) throw error;
  //             res.send({
  //                 success: true,
  //                 message: 'Berhasil edit data!',
  //             });
  //         });
  //         connection.release();
  //     })
  // },
  // deleteCategoryCourse(req,res){
  //     let id = req.body.id
  //     pool.getConnection(function(err, connection) {
  //         if (err) throw err;
  //         connection.query(
  //             `
  //             DELETE FROM tabel_karyawan WHERE karyawan_id = ?;
  //             `
  //         , [id],
  //         function (error, results) {
  //             if(error) throw error;
  //             res.send({
  //                 success: true,
  //                 message: 'Berhasil hapus data!'
  //             });
  //         });
  //         connection.release();
  //     })
  // }
};
