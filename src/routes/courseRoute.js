const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");
const verify = require("../middleware/authVerification");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllCourses);
router.get("/:id", verify.authenticateToken, getCourseById);
router.post("/", [verify.authenticateToken, body("title").isLength({ min: 3 }).withMessage("Judul kelas kurang dari 3 karakter"), body("course_category_id").isNumeric().withMessage("Kategori kelas wajib berupa angka")], createCourse);
router.put(
  "/:id",
  [
    verify.authenticateToken,
    body("title").isLength({ min: 3 }).withMessage("Judul kelas kurang dari 3 karakter"),
    body("course_category_id").isLength({ min: 1 }).withMessage("Kategori kelas wajib diisi"),
    body("course_category_id").isNumeric().withMessage("Kategori kelas wajib berupa angka"),
  ],
  updateCourse
);
router.delete("/:id", verify.authenticateToken, deleteCourse);

module.exports = router;
