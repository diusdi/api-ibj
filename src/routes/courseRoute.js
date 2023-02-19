const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");
const verify = require("../middleware/authVerification");
const express = require("express");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllCourses);
router.get("/:id", verify.authenticateToken, getCourseById);
router.post("/", verify.authenticateToken, createCourse);
router.put("/:id", verify.authenticateToken, updateCourse);
router.delete("/:id", verify.authenticateToken, deleteCourse);

module.exports = router;
