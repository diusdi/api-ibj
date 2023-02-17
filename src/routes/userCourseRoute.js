const { createUserCourse, getAllUserCourse, getUserCourseById, updateUserCourse, deleteUserCourse } = require("../controllers/userCoursesController");
const express = require("express");
const router = express.Router();

router.get("/", getAllUserCourse);
router.get("/:id", getUserCourseById);
router.post("/", createUserCourse);
router.put("/:id", updateUserCourse);
router.delete("/:id", deleteUserCourse);

module.exports = router;
