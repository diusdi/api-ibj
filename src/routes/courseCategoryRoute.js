const router = require("express").Router();
const { courseCategory } = require("../controllers");

router.get("/", courseCategory.getCategoriesCourse);
router.get("/:id", courseCategory.getCategoryCourseByID);
router.post("/add", courseCategory.addCategoriesCourse);

module.exports = router;
