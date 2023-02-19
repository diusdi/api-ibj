const { createUserCourse, getAllUserCourse, getUserCourseById, updateUserCourse, deleteUserCourse } = require("../controllers/userCoursesController");
const verify = require("../middleware/authVerification");
const express = require("express");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllUserCourse);
router.get("/:id", verify.authenticateToken, getUserCourseById);
router.post("/", verify.authenticateToken, createUserCourse);
router.put("/:id", verify.authenticateToken, updateUserCourse);
router.delete("/:id", verify.authenticateToken, deleteUserCourse);

module.exports = router;
