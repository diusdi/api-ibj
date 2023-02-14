const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getCourse(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM courses
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

  getCourseByID(req, res) {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT * FROM courses WHERE id = ?;
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
            success: false,
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
      title: req.body.title,
      category: req.body.category,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO courses SET ?;
                `,
        [data],
        function (error, result) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil menambahkan data!",
            data: result,
          });
        }
      );
      connection.release();
    });
  },

  editCourse(req,res){
      let dataEdit = {
          title : req.body.title,
          category : req.body.category,
      }
      let id = req.body.id
      pool.getConnection(function(err, connection) {
          if (err) throw err;
          connection.query(
              `
              UPDATE courses SET ? WHERE id = ?;
              `
          , [dataEdit, id],
          function (error, results) {
              if(error) throw error;
              res.send({
                  success: true,
                  message: 'Berhasil mengedit data!',
              });
          });
          connection.release();
      })
  },
  
  deleteCourse(req,res){
      let id = req.body.id
      pool.getConnection(function(err, connection) {
          if (err) throw err;
          connection.query(
              `
              DELETE FROM courses WHERE id = ?;
              `
          , [id],
          function (error, results) {
              if(error) throw error;
              res.send({
                  success: true,
                  message: 'Berhasil menghapus data!'
              });
          });
          connection.release();
      })
  }
};
