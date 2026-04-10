const mongoose = require("mongoose");

const answerDetailSchema = new mongoose.Schema(
  {
    questionId: mongoose.Schema.Types.ObjectId,
    selected: { type: Number, default: null },
    correct: { type: Boolean, default: false },
    timedOut: { type: Boolean, default: false },
    skipped: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
    multiplier: { type: Number, default: 1 },
  },
  { _id: false }
);

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    mode: { type: String, enum: ["quiz", "exam"], required: true },
    score: { type: Number, required: true },
    totalPossible: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    maxStreak: { type: Number, default: 0 },
    accuracy: { type: Number, required: true },
    answers: [answerDetailSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
