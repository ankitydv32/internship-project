const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/test", (req, res) => {
  res.send("Working");
});

router.get("/profile", verifyToken, authController.profile);

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/verify/:token", authController.verifyEmail);

router.post("/forgot", authController.forgotPassword);
router.post("/reset/:token", authController.resetPassword);

router.get("/users", verifyToken, isAdmin, authController.getUsers);
router.put("/users/:id", verifyToken, isAdmin, authController.updateUser);
router.delete("/users/:id", verifyToken, isAdmin, authController.deleteUser);

module.exports = router;