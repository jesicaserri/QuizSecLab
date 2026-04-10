import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthScreen from "./components/AuthScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";
import QuizEngine from "./components/QuizEngine.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import API from "./api/axios";

function QuizApp() {
  const { user, logout, loading: authLoading } = useAuth();
  const [screen, setScreen] = useState("start");
  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  // Fetch quiz data from API
  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    API.get("/quiz/categories")
      .then((res) => {
        setQuizData(res.data);
        setDataError(null);
      })
      .catch((err) => {
        console.error("Failed to load quiz data:", err);
        setDataError("Failed to load quiz data. Is the server running?");
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  const handleStart = (cfg) => {
    setConfig(cfg);
    setScreen("quiz");
  };

  const handleFinish = async (res) => {
    setResults(res);
    setScreen("result");

    // Save result to backend
    try {
      const totalPossible = res.questions.reduce((s, q) => s + q.points, 0);
      const correct = Object.values(res.answers).filter((a) => a.correct).length;

      await API.post("/quiz/results", {
        categoryId: res.category.id,
        categoryName: res.category.name,
        mode: res.mode,
        score: res.score,
        totalPossible,
        correctCount: correct,
        totalQuestions: res.questions.length,
        maxStreak: res.maxStreak,
        accuracy: Math.round((correct / res.questions.length) * 100),
        answers: Object.entries(res.answers).map(([qId, a]) => ({
          questionId: qId,
          selected: a.selected,
          correct: a.correct,
          timedOut: a.timedOut || false,
          skipped: a.skipped || false,
          points: a.points || 0,
          multiplier: a.multiplier || 1,
        })),
      });
    } catch (err) {
      console.error("Failed to save result:", err);
    }
  };

  const handleRestart = () => {
    setResults(null);
    setConfig(null);
    setScreen("start");
  };

  if (authLoading) {
    return (
      <div className="app-root">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-root">
        <AuthScreen />
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* User bar */}
      <div className="user-bar">
        <span className="user-greeting">
          👋 Hey, <strong>{user.username}</strong>
        </span>
        <button className="logout-btn" onClick={logout}>
          Sign Out
        </button>
      </div>

      {dataLoading && (
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p>Loading quiz data...</p>
        </div>
      )}

      {dataError && (
        <div className="error-screen">
          <div className="error-icon">⚠️</div>
          <p>{dataError}</p>
          <button className="start-btn" style={{ maxWidth: 300 }} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {!dataLoading && !dataError && quizData && (
        <>
          {screen === "start" && (
            <StartScreen onStart={handleStart} quizData={quizData} />
          )}
          {screen === "quiz" && (
            <QuizEngine config={config} onFinish={handleFinish} />
          )}
          {screen === "result" && (
            <ResultScreen results={results} onRestart={handleRestart} />
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QuizApp />
    </AuthProvider>
  );
}