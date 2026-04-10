import { useState, useEffect, useRef, useCallback } from "react";

const LIFELINES = [
  { id: "fifty", icon: "50/50", label: "50/50", desc: "Remove 2 wrong answers" },
  { id: "skip",  icon: "⏭",    label: "Skip",  desc: "Skip this question" },
  { id: "extra", icon: "+15s",  label: "+15s",  desc: "Add 15 seconds" },
];

export default function QuizEngine({ config, onFinish }) {
  const { category, mode, timePerQuestion } = config;
  const questions = category.questions;

  const [qIndex,          setQIndex]          = useState(0);
  const [answers,         setAnswers]         = useState({});
  const [selected,        setSelected]        = useState(null);
  const [revealed,        setRevealed]        = useState(false);
  const [timeLeft,        setTimeLeft]        = useState(timePerQuestion);
  const [eliminated,      setEliminated]      = useState([]);
  const [usedLifelines,   setUsedLifelines]   = useState([]);
  const [streak,          setStreak]          = useState(0);
  const [maxStreak,       setMaxStreak]       = useState(0);
  const [score,           setScore]           = useState(0);
  const [timedOut,        setTimedOut]        = useState(false);
  const [shakeTimer,      setShakeTimer]      = useState(false);
  const [pulse,           setPulse]           = useState(false);
  const [showStreakBurst, setShowStreakBurst]  = useState(false);

  const timerRef   = useRef(null);
  const answersRef = useRef({});
  const scoreRef   = useRef(0);
  const streakRef  = useRef(0);
  const maxStreakRef = useRef(0);

  answersRef.current = answers;

  const q = questions[qIndex];

  const clearTimer = () => clearInterval(timerRef.current);

  const handleTimeout = useCallback(() => {
    clearTimer();
    setTimedOut(true);
    setRevealed(true);
    setStreak(0);
    streakRef.current = 0;
    const newAnswers = {
      ...answersRef.current,
      [q.id]: { selected: null, correct: false, timedOut: true, points: 0 },
    };
    setAnswers(newAnswers);
    answersRef.current = newAnswers;
  }, [q]);

  useEffect(() => {
    if (revealed || timedOut) return;
    if (mode !== "exam") setTimeLeft(timePerQuestion);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 4) setShakeTimer(true);
        else setShakeTimer(false);
        if (t <= 1) { handleTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearTimer();
  }, [qIndex]); // eslint-disable-line

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0 && !revealed) {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }
  }, [timeLeft]);

  const selectAnswer = (idx) => {
    if (revealed || timedOut || eliminated.includes(idx)) return;
    clearTimer();
    setSelected(idx);

    const isCorrect  = idx === q.correct;
    const newStreak  = isCorrect ? streakRef.current + 1 : 0;
    const multiplier = Math.min(1 + Math.floor(newStreak / 2) * 0.5, 3);
    const earned     = isCorrect ? Math.round(q.points * multiplier) : 0;

    streakRef.current = newStreak;
    const newMax = Math.max(maxStreakRef.current, newStreak);
    maxStreakRef.current = newMax;

    scoreRef.current += earned;

    setStreak(newStreak);
    setMaxStreak(newMax);
    setScore(scoreRef.current);

    if (newStreak >= 3) {
      setShowStreakBurst(true);
      setTimeout(() => setShowStreakBurst(false), 1400);
    }

    const newAnswers = {
      ...answersRef.current,
      [q.id]: { selected: idx, correct: isCorrect, timedOut: false, points: earned, multiplier },
    };
    setAnswers(newAnswers);
    answersRef.current = newAnswers;

    if (mode === "quiz") {
      setRevealed(true);
    } else {
      setTimeout(() => advanceQuestion(newAnswers), 320);
    }
  };

  const advanceQuestion = (ans = answersRef.current) => {
    const nextIdx = qIndex + 1;
    if (nextIdx >= questions.length) {
      onFinish({
        answers:   ans,
        score:     scoreRef.current,
        streak:    streakRef.current,
        maxStreak: maxStreakRef.current,
        questions,
        category,
        mode,
      });
    } else {
      setQIndex(nextIdx);
      setSelected(null);
      setRevealed(false);
      setTimedOut(false);
      setEliminated([]);
      setShakeTimer(false);
    }
  };

  const handleNext = () => advanceQuestion(answersRef.current);

  const useLifeline = (type) => {
    if (usedLifelines.includes(type) || revealed || timedOut) return;
    setUsedLifelines((prev) => [...prev, type]);

    if (type === "fifty") {
      const wrongIndexes = q.options
        .map((_, i) => i)
        .filter((i) => i !== q.correct);
      const toEliminate = wrongIndexes
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setEliminated(toEliminate);

    } else if (type === "skip") {
      clearTimer();
      const newAnswers = {
        ...answersRef.current,
        [q.id]: { selected: null, correct: false, timedOut: false, points: 0, skipped: true },
      };
      setAnswers(newAnswers);
      answersRef.current = newAnswers;
      setTimeout(() => advanceQuestion(newAnswers), 0);

    } else if (type === "extra") {
      setTimeLeft((t) => t + 15);
    }
  };

  const progress    = (qIndex / questions.length) * 100;
  const timerPct    = Math.max((timeLeft / timePerQuestion) * 100, 0);
  const timerDanger = timeLeft <= 10;
  const multiplier  = Math.min(1 + Math.floor(streak / 2) * 0.5, 3);
  const R   = 26;
  const CIR = 2 * Math.PI * R;

  return (
    <div className="quiz-engine">

      {/* Top bar */}
      <div className="quiz-topbar">
        <div className="quiz-left-chips">
          <span className="quiz-cat-chip">{category.icon} {category.name}</span>
          <span className="quiz-mode-chip">{mode === "exam" ? "📝 Exam" : "🎯 Quiz"}</span>
        </div>
        <div className="quiz-right-chips">
          {streak >= 2 && (
            <span className="streak-chip">🔥 ×{streak} — {multiplier}x</span>
          )}
          <span className="quiz-score-chip">⭐ {score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-card">
        <div className="progress-header">
          <span className="progress-label">Question Progress</span>
          <span className="progress-frac">{qIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-dots">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`pdot ${i < qIndex ? "done" : i === qIndex ? "current" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Timer + Lifelines */}
      <div className="timer-lifeline-row">

        <div className={`timer-card ${timerDanger ? "danger" : ""} ${shakeTimer ? "shake" : ""}`}>
          <div className="timer-ring-wrap">
            <svg className="timer-ring" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={R} fill="none" strokeWidth="5"
                stroke={timerDanger ? "#FECACA" : "#E2E8F0"} />
              <circle
                cx="32" cy="32" r={R} fill="none" strokeWidth="5"
                stroke={timerDanger ? "#EF4444" : "#6366F1"}
                strokeDasharray={CIR}
                strokeDashoffset={CIR * (1 - timerPct / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
                transform="rotate(-90 32 32)"
              />
            </svg>
            <span className={`timer-num${timerDanger ? " danger" : ""}${pulse ? " pulse" : ""}`}>
              {timeLeft}
            </span>
          </div>
          <span className="timer-label">{timerDanger ? "Hurry!" : "Seconds"}</span>
        </div>

        <div className="lifelines-card">
          <div className="lifelines-header">
            <span className="lifelines-title">Lifelines</span>
            <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>
              {usedLifelines.length}/3 used
            </span>
          </div>
          <div className="lifelines-btns">
            {LIFELINES.map((ll) => (
              <button
                key={ll.id}
                className={`lifeline-btn ${usedLifelines.includes(ll.id) ? "used" : ""} ${(revealed || timedOut) ? "disabled" : ""}`}
                onClick={() => useLifeline(ll.id)}
                title={ll.desc}
                disabled={usedLifelines.includes(ll.id) || revealed || timedOut}
              >
                <span className="ll-icon">{ll.icon}</span>
                <span className="ll-label">{ll.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="question-card">
        <div className="q-meta">
          <span className={`difficulty-tag diff-${q.difficulty}`}>{q.difficulty}</span>
          <span className="q-points-badge">
            +{q.points} pts{multiplier > 1 ? ` × ${multiplier}🔥` : ""}
          </span>
        </div>
        <p className="q-text">{q.text}</p>
      </div>

      {/* Options */}
      <div className="options-grid">
        {q.options.map((opt, i) => {
          let cls = "option-btn";
          if (eliminated.includes(i))       cls += " eliminated";
          else if (revealed || timedOut) {
            if (i === q.correct)            cls += " correct";
            else if (i === selected)        cls += " wrong";
          } else if (selected === i)        cls += " selected";

          return (
            <button
              key={i}
              className={cls}
              onClick={() => selectAnswer(i)}
              disabled={eliminated.includes(i) || revealed || timedOut}
            >
              <span className="opt-letter">{["A", "B", "C", "D"][i]}</span>
              <span className="opt-text">{opt}</span>
              {(revealed || timedOut) && i === q.correct && (
                <span className="opt-check">✓</span>
              )}
              {(revealed || timedOut) && i === selected && i !== q.correct && (
                <span className="opt-x">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback — quiz mode only */}
      {(revealed || timedOut) && mode === "quiz" && (
        <div className={`feedback-card ${
          timedOut ? "timed-out" :
          selected === q.correct ? "correct-fb" : "wrong-fb"
        }`}>
          <div className="fb-row">
            <span className="fb-icon">
              {timedOut ? "⏰" : selected === q.correct ? "🎉" : "💡"}
            </span>
            <span className="fb-title">
              {timedOut
                ? "Time's up!"
                : selected === q.correct
                  ? `Correct! +${answersRef.current[q.id]?.points ?? 0} pts`
                  : "Not quite!"}
            </span>
          </div>
          <p className="fb-explain">{q.explanation}</p>
          <button className="next-btn" onClick={handleNext}>
            {qIndex + 1 >= questions.length ? "See Results →" : "Next Question →"}
          </button>
        </div>
      )}

      {/* Streak burst overlay */}
      {showStreakBurst && (
        <div className="streak-burst">
          🔥 {streak} in a row!
          <span className="burst-multi">{multiplier}× multiplier active</span>
        </div>
      )}
    </div>
  );
}