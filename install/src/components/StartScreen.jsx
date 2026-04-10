import { useState } from "react";

export default function StartScreen({ onStart, quizData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mode, setMode] = useState("quiz");
  const [timePerQ, setTimePerQ] = useState(30);

  const handleStart = () => {
    if (!selectedCategory) return;
    const cat = quizData.categories.find((c) => c.id === selectedCategory);
    onStart({
      category: cat,
      mode,
      timePerQuestion: mode === "exam" ? timePerQ * cat.questions.length : timePerQ,
      totalTime: mode === "exam",
    });
  };

  const selectedCat = quizData.categories.find((c) => c.id === selectedCategory);

  return (
    <div className="start-screen">
      <div className="start-header">
        <div className="start-logo">🎯 Quiz Engine v2.0</div>
        <h1 className="start-title">
          Test Your <span>Knowledge</span>
        </h1>
        <p className="start-sub">
          Pick a category, choose your mode, and challenge yourself.
        </p>
      </div>

      <div className="section-label">Choose Category</div>
      <div className="category-grid">
        {quizData.categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-card ${selectedCategory === cat.id ? "selected" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {selectedCategory === cat.id && <div className="cat-check">✓</div>}
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.questions.length} Questions</span>
          </button>
        ))}
      </div>

      <div className="section-label">Select Mode</div>
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === "quiz" ? "active" : ""}`}
          onClick={() => setMode("quiz")}
        >
          <div className="mode-icon-wrap">🎯</div>
          <div>
            <div className="mode-title">Quiz Mode</div>
            <div className="mode-desc">Timer per question · Instant feedback</div>
          </div>
        </button>
        <button
          className={`mode-btn ${mode === "exam" ? "active" : ""}`}
          onClick={() => setMode("exam")}
        >
          <div className="mode-icon-wrap">📝</div>
          <div>
            <div className="mode-title">Exam Mode</div>
            <div className="mode-desc">Total countdown · Results at the end</div>
          </div>
        </button>
      </div>

      <div className="section-label">
        {mode === "exam"
          ? "Time Per Question (× question count = total)"
          : "Time Per Question"}
      </div>
      <div className="time-slider-wrap">
        <div className="time-display">
          <span className="time-val">{timePerQ}s</span>
          {mode === "exam" && selectedCat && (
            <span className="time-total">
              = {timePerQ * selectedCat.questions.length}s total
            </span>
          )}
        </div>
        <input
          type="range"
          min={15}
          max={120}
          step={15}
          value={timePerQ}
          onChange={(e) => setTimePerQ(Number(e.target.value))}
          className="time-slider"
        />
        <div className="slider-ticks">
          {[15, 30, 45, 60, 75, 90, 105, 120].map((t) => (
            <span key={t} className={`tick ${timePerQ === t ? "active" : ""}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <button
        className="start-btn"
        onClick={handleStart}
        disabled={!selectedCategory}
      >
        <span>Start {mode === "quiz" ? "Quiz" : "Exam"}</span>
        <span className="start-arrow">→</span>
      </button>

    </div>
  );
}