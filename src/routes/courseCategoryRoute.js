const { createCourseCategory, getAllCourseCategory, getCourseCategoryById, updateCourseCategory, deleteCourseCategory } = require("../controllers/courseCategoriesController");
const express = require("express");
const { body } = require("express-validator");
const verify = require("../middleware/authVerification");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllCourseCategory);
router.get("/:id", verify.authenticateToken, getCourseCategoryById);
router.put("/:id", [verify.authenticateToken, body("name").isLength({ min: 3 }).withMessage('Nama kategori kurang dari 3 karakter')], updateCourseCategory);
router.post("/", [verify.authenticateToken, body("name").isLength({ min: 3 }).withMessage('Nama kategori kurang dari 3 karakter')], createCourseCategory);
router.delete("/:id", verify.authenticateToken, deleteCourseCategory);

module.exports = router;
