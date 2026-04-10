const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// GET /api/user/profile — authenticated
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Aggregate quiz stats
    const results = await QuizResult.find({ userId: req.user.id });

    const stats = {
      totalQuizzes: results.length,
      totalScore: results.reduce((sum, r) => sum + r.score, 0),
      averageAccuracy:
        results.length > 0
          ? Math.round(
              results.reduce((sum, r) => sum + r.accuracy, 0) / results.length
            )
          : 0,
      bestStreak: results.reduce((max, r) => Math.max(max, r.maxStreak), 0),
    };

    res.json({ user: user.toJSON(), stats });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
