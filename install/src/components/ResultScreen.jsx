import { useEffect, useState } from "react";

function getGrade(pct) {
  if (pct >= 90) return { grade: "S", label: "Legendary",  color: "#D97706", emoji: "👑" };
  if (pct >= 75) return { grade: "A", label: "Excellent",  color: "#059669", emoji: "🏆" };
  if (pct >= 60) return { grade: "B", label: "Great",      color: "#6366F1", emoji: "⭐" };
  if (pct >= 45) return { grade: "C", label: "Good",       color: "#F59E0B", emoji: "🎯" };
  if (pct >= 30) return { grade: "D", label: "Needs Work", color: "#EF4444", emoji: "📚" };
  return           { grade: "F", label: "Try Again",  color: "#94A3B8", emoji: "💪" };
}

export default function ResultScreen({ results, onRestart }) {
  const { answers, score, maxStreak, questions, category, mode } = results;
  const [animScore,     setAnimScore]     = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalPossible = questions.reduce((s, q) => s + q.points, 0);
  const correct  = Object.values(answers).filter((a) =>  a.correct).length;
  const wrong    = Object.values(answers).filter((a) => !a.correct && !a.skipped && !a.timedOut).length;
  const skipped  = Object.values(answers).filter((a) =>  a.skipped).length;
  const timedOut = Object.values(answers).filter((a) =>  a.timedOut).length;
  const pct      = Math.round((correct / questions.length) * 100);
  const { grade, label, color, emoji } = getGrade(pct);

  useEffect(() => {
    if (score === 0) return;
    let current = 0;
    const step = score / 60;
    const id = setInterval(() => {
      current += step;
      if (current >= score) { setAnimScore(score); clearInterval(id); return; }
      setAnimScore(Math.round(current));
    }, 16);
    return () => clearInterval(id);
  }, [score]);

  const diffBreakdown = ["easy", "medium", "hard"].map((diff) => {
    const qs  = questions.filter((q) => q.difficulty === diff);
    const hit = qs.filter((q) => answers[q.id]?.correct).length;
    return { diff, total: qs.length, correct: hit };
  });

  const diffColor = (d) =>
    d === "easy" ? "#10B981" : d === "medium" ? "#F59E0B" : "#EF4444";

  return (
    <div className="result-screen">

      <div className="result-header">
        <span className="result-cat-chip">
          {category.icon} {category.name} · {mode === "exam" ? "Exam" : "Quiz"} Mode
        </span>
      </div>

      {/* Grade card */}
      <div className="grade-card">
        <div className="grade-emoji">{emoji}</div>
        <div className="grade-letter" style={{ color }}>{grade}</div>
        <div className="grade-label"  style={{ color }}>{label}</div>
        <div className="score-row">
          <span className="score-num" style={{ color }}>{animScore}</span>
          <span className="score-denom"> / {totalPossible} pts</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-val correct-col">{correct}</div>
          <div className="stat-key">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-val wrong-col">{wrong}</div>
          <div className="stat-key">Wrong</div>
        </div>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "#94A3B8" }}>{skipped + timedOut}</div>
          <div className="stat-key">Missed</div>
        </div>
        <div className="stat-card">
          <div className="stat-val streak-col">🔥 {maxStreak}</div>
          <div className="stat-key">Best Streak</div>
        </div>
      </div>

      {/* Accuracy */}
      <div className="accuracy-card">
        <div className="acc-header">
          <span>Accuracy</span>
          <span style={{ color, fontWeight: 700 }}>{pct}%</span>
        </div>
        <div className="acc-track">
          <div className="acc-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="diff-card">
        <div className="diff-card-title">Difficulty Breakdown</div>
        {diffBreakdown.map(({ diff, total, correct: hit }) =>
          total > 0 ? (
            <div key={diff} className="diff-row">
              <span className={`diff-dot diff-${diff}`} />
              <span className="diff-name">{diff}</span>
              <div className="diff-bar-track">
                <div
                  className="diff-bar-fill"
                  style={{
                    width: `${total ? (hit / total) * 100 : 0}%`,
                    background: diffColor(diff),
                  }}
                />
              </div>
              <span className="diff-frac">{hit}/{total}</span>
            </div>
          ) : null
        )}
      </div>

      {/* Question breakdown toggle */}
      <button
        className="breakdown-toggle"
        onClick={() => setShowBreakdown(!showBreakdown)}
      >
        {showBreakdown ? "▲ Hide" : "▼ Show"} Question Breakdown
      </button>

      {showBreakdown && (
        <div className="q-breakdown">
          {questions.map((q, i) => {
            const ans    = answers[q.id];
            const status = ans?.correct ? "✓" : ans?.skipped ? "⏭" : ans?.timedOut ? "⏰" : "✗";
            const cls    = ans?.correct ? "qb-correct" : ans?.skipped ? "qb-skip" : "qb-wrong";
            return (
              <div key={q.id} className={`qb-row ${cls}`}>
                <span className="qb-num">Q{i + 1}</span>
                <span className="qb-status">{status}</span>
                <span className="qb-text">{q.text.slice(0, 48)}…</span>
                <span className="qb-pts">{ans?.points ? `+${ans.points}` : "0"}</span>
              </div>
            );
          })}
        </div>
      )}

      <button className="restart-btn" onClick={onRestart}>↩ Play Again</button>
    </div>
  );
}