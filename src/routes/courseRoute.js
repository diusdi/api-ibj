const router = require("express").Router();
const { course } = require("../controllers");

router.get("/", course.getCourse);
router.get("/:id", course.getCourseByID);
router.post("/add", course.addCategoriesCourse);
router.post("/edit", course.editCourse);
router.post("/delete", course.deleteCourse);

module.exports = router;
