const express = require("express");
const Category = require("../models/Category");
const QuizResult = require("../models/QuizResult");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/quiz/categories — public, returns all categories with questions
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    // Transform to match frontend quizData format
    const formatted = categories.map((cat) => ({
      id: cat.categoryId,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      questions: cat.questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        difficulty: q.difficulty,
        text: q.text,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation,
        points: q.points,
      })),
    }));

    res.json({ categories: formatted });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/quiz/results — authenticated, save quiz result
router.post("/results", auth, async (req, res) => {
  try {
    const {
      categoryId,
      categoryName,
      mode,
      score,
      totalPossible,
      correctCount,
      totalQuestions,
      maxStreak,
      accuracy,
      answers,
    } = req.body;

    const result = new QuizResult({
      userId: req.user.id,
      categoryId,
      categoryName,
      mode,
      score,
      totalPossible,
      correctCount,
      totalQuestions,
      maxStreak,
      accuracy,
      answers: answers || [],
    });

    await result.save();

    res.status(201).json({ message: "Result saved", result });
  } catch (err) {
    console.error("Save result error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/quiz/results — authenticated, get user's quiz history
router.get("/results", auth, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ results });
  } catch (err) {
    console.error("Get results error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
