const { createCourseCategory, getAllCourseCategory, getCourseCategoryById, updateCourseCategory, deleteCourseCategory } = require("../controllers/courseCategoriesController");
const express = require("express");
const router = express.Router();

router.get("/", getAllCourseCategory);
router.get("/:id", getCourseCategoryById);
router.put("/:id", updateCourseCategory);
router.delete("/:id", deleteCourseCategory);

module.exports = router;
