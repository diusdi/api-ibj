const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
