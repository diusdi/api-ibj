const router = require("express").Router();
const { courseCategory } = require("../controllers");

router.get("/", courseCategory.getCategoriesCourse);
router.get("/:id", courseCategory.getCategoryCourseByID);
router.post("/add", courseCategory.addCategoriesCourse);
router.post("/edit", courseCategory.editCategoryCourse);
router.post("/delete", courseCategory.deleteCategoryCourse);

module.exports = router;
