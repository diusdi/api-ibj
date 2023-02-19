const { createCourseCategory, getAllCourseCategory, getCourseCategoryById, updateCourseCategory, deleteCourseCategory } = require("../controllers/courseCategoriesController");
const express = require("express");
const verify = require("../middleware/authVerification");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllCourseCategory);
router.get("/:id", verify.authenticateToken, getCourseCategoryById);
router.put("/:id", verify.authenticateToken, updateCourseCategory);
router.post("/", verify.authenticateToken, createCourseCategory);
router.delete("/:id", verify.authenticateToken, deleteCourseCategory);

module.exports = router;
