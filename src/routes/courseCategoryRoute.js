const { createCourseCategory, getAllCourseCategory, getCourseCategoryById, updateCourseCategory, deleteCourseCategory } = require("../controllers/courseCategoriesController");
const express = require("express");
const verify = require('../middleware/authVerification')
const router = express.Router();

router.get("/", verify.authenticateToken, getAllCourseCategory);
router.get("/:id", getCourseCategoryById);
router.put("/:id", updateCourseCategory);
router.post("/", createCourseCategory);
router.delete("/:id", deleteCourseCategory);

module.exports = router;
