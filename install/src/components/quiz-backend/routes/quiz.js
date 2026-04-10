const express = require("express");
const User = require("../models/User");
const { questions, categories } = require("../data/questions");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ─── Helper: shuffle array ────────────────────────────────────────────────────
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── GET /api/quiz/categories  ────────────────────────────────────────────────
// Returns all available quiz categories with question counts
router.get("/categories", (req, res) => {
  const summary = categories.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat);
    return {
      name: cat,
      totalQuestions: catQuestions.length,
      difficulties: {
        easy:   catQuestions.filter((q) => q.difficulty === "easy").length,
        medium: catQuestions.filter((q) => q.difficulty === "medium").length,
        hard:   catQuestions.filter((q) => q.difficulty === "hard").length,
      },
    };
  });
  res.json({ categories: summary });
});

// ─── GET /api/quiz/questions  ─────────────────────────────────────────────────
// Query params:
//   category   - filter by category (optional, default = all)
//   difficulty - easy | medium | hard (optional, default = all)
//   limit      - number of questions (optional, default = 10)
router.get("/questions", (req, res) => {
  try {
    let { category, difficulty, limit = 10 } = req.query;
    limit = parseInt(limit, 10);

    let filtered = [...questions];

    if (category && category !== "All") {
      filtered = filtered.filter(
        (q) => q.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty && difficulty !== "All") {
      filtered = filtered.filter(
        (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (filtered.length === 0) {
      return res.status(404).json({ message: "No questions found for the selected filters." });
    }

    // Shuffle and limit
    const selected = shuffle(filtered).slice(0, Math.min(limit, filtered.length));

    // Send without revealing the answer — answers are checked server-side
    const sanitized = selected.map(({ answer: _ans, ...rest }, idx) => ({
      id: idx,
      ...rest,
    }));

    res.json({
      total: sanitized.length,
      category: category || "All",
      difficulty: difficulty || "All",
      questions: sanitized,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});

// ─── POST /api/quiz/submit  (protected) ───────────────────────────────────────
// Body: { category, difficulty, timeTaken, answers: [{ question, selectedAnswer }] }
router.post("/submit", protect, async (req, res) => {
  try {
    const { category, difficulty, timeTaken, answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "No answers provided." });
    }

    // Grade each answer against the source data
    let score = 0;
    const graded = answers.map(({ question, selectedAnswer }) => {
      const match = questions.find(
        (q) =>
          q.question === question &&
          (category === "All" || !category || q.category.toLowerCase() === category.toLowerCase())
      );

      const isCorrect = match ? match.answer === selectedAnswer : false;
      if (isCorrect) score++;

      return {
        question,
        selectedAnswer,
        correctAnswer: match ? match.answer : "N/A",
        isCorrect,
      };
    });

    const totalQ = answers.length;
    const percentage = parseFloat(((score / totalQ) * 100).toFixed(2));

    // Persist the attempt on the user document
    const user = await User.findById(req.user._id);
    user.addQuizAttempt({
      category: category || "Mixed",
      score,
      totalQ,
      percentage,
      timeTaken: timeTaken || 0,
    });
    await user.save();

    res.json({
      message: "Quiz submitted successfully!",
      result: {
        score,
        totalQ,
        percentage,
        timeTaken,
        graded,
      },
      stats: {
        totalQuizzesTaken: user.totalQuizzesTaken,
        averageScore: user.averageScore,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit quiz." });
  }
});

// ─── GET /api/quiz/leaderboard ────────────────────────────────────────────────
// Top 10 users by averageScore
router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find({ totalQuizzesTaken: { $gt: 0 } })
      .select("username averageScore totalQuizzesTaken")
      .sort({ averageScore: -1 })
      .limit(10);

    res.json({ leaderboard: topUsers });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard." });
  }
});

// ─── GET /api/quiz/history  (protected) ───────────────────────────────────────
router.get("/history", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("quizHistory");
    const history = (user.quizHistory || [])
      .sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt))
      .slice(0, 20); // last 20 attempts

    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch quiz history." });
  }
});

module.exports = router;