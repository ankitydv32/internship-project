const express = require("express");
const router = express.Router();

const {
  getArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  updateStatus,
  toggleSold,
  toggleHide
} = require("../controllers/artworkController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, isAdmin, getArtworks);
router.post("/", verifyToken, isAdmin, addArtwork);

router.put("/:id", verifyToken, isAdmin, updateArtwork);  
router.delete("/:id", verifyToken, isAdmin, deleteArtwork);

router.patch("/:id/status", verifyToken, isAdmin, updateStatus);
router.patch("/:id/sold", verifyToken, isAdmin, toggleSold);
router.patch("/:id/hide", verifyToken, isAdmin, toggleHide);

module.exports = router;