const express = require("express");
const User = require("./User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ─── GET /api/users/profile  (protected) ─────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile." });
  }
});

// ─── PUT /api/users/profile  (protected) ─────────────────────────────────────
// Update username or email (not password — handled separately)
router.put("/profile", protect, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updates = {};

    if (username) updates.username = username.trim();
    if (email) {
      // Check email not taken by another user
      const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (exists) return res.status(409).json({ message: "Email already in use." });
      updates.email = email.toLowerCase().trim();
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({ message: "Profile updated successfully.", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Failed to update profile." });
  }
});

// ─── PUT /api/users/change-password  (protected) ─────────────────────────────
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new password are required." });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters." });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password." });
  }
});

// ─── DELETE /api/users/account  (protected) ──────────────────────────────────
router.delete("/account", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account." });
  }
});

// ─── GET /api/users  (admin only) ────────────────────────────────────────────
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip  = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// ─── GET /api/users/:id  (admin only) ────────────────────────────────────────
router.get("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
});

// ─── DELETE /api/users/:id  (admin only) ─────────────────────────────────────
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ message: `User ${user.username} deleted.` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user." });
  }
});

module.exports = router;