const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, default: "mcq" },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true },
  explanation: { type: String, required: true },
  points: { type: Number, required: true },
});

const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
