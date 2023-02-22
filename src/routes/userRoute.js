const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/usersController");
const verify = require("../middleware/authVerification");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

router.get("/", verify.authenticateToken, getAllUser);
router.get("/:id", verify.authenticateToken, getUserById);
router.post(
  "/",
  [
    verify.authenticateToken,
    body("name").isLength({ min: 3 }).withMessage("Nama peserta kurang dari 3 karakter"),
    body("email").isEmail().withMessage("email peserta tidak valid"),
    body("password").isLength({ min: 8 }).withMessage("Password kategori kurang dari 8 karakter"),
  ],
  createUser
);
router.put(
  "/:id",
  [
    verify.authenticateToken,
    body("name").isLength({ min: 3 }).withMessage("Nama peserta kurang dari 3 karakter"),
    body("email").isEmail().withMessage("email peserta tidak valid"),
    body("password").isLength({ min: 8 }).withMessage("Password kategori kurang dari 8 karakter"),
  ],
  updateUser
);
router.delete("/:id", verify.authenticateToken, deleteUser);

module.exports = router;
