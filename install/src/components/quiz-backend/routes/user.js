const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const quizAttemptSchema = new mongoose.Schema({
  category:    { type: String, required: true },
  score:       { type: Number, required: true },
  totalQ:      { type: Number, required: true },
  percentage:  { type: Number, required: true },
  timeTaken:   { type: Number },          // seconds
  attemptedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    quizHistory: [quizAttemptSchema],
    totalQuizzesTaken: { type: Number, default: 0 },
    averageScore:      { type: Number, default: 0 },
    lastLogin:         { type: Date },
  },
  { timestamps: true }
);

// ─── Hash password before save ────────────────────────────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Compare password method ──────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ─── Update stats after quiz ──────────────────────────────────────────────────
userSchema.methods.addQuizAttempt = function (attemptData) {
  this.quizHistory.push(attemptData);
  this.totalQuizzesTaken = this.quizHistory.length;
  const total = this.quizHistory.reduce((sum, a) => sum + a.percentage, 0);
  this.averageScore = parseFloat((total / this.quizHistory.length).toFixed(2));
};

// ─── Never return password in JSON ───────────────────────────────────────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);