const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/usersController");
const verify = require("../middleware/authVerification");
const express = require("express");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllUser);
router.get("/:id", verify.authenticateToken, getUserById);
router.post("/", verify.authenticateToken, createUser);
router.put("/:id", verify.authenticateToken, updateUser);
router.delete("/:id", verify.authenticateToken, deleteUser);

module.exports = router;
