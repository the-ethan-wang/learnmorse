"use client";
import { useState, useEffect, useRef } from "react";
import { morseMap, decode } from "../lib/morse";

const modes = [
  { key: "lives", label: "Lives" },
  { key: "time", label: "Time" },
  { key: "questions", label: "Questions" },
];

const livesOptions = [1, 3, 5];
const timeOptions = [30, 60];
const questionOptions = [10, 20, 30];

export default function TestArea({ letters }: { letters: string[] }) {
  const [mode, setMode] = useState<"lives" | "time" | "questions">("lives");
  const [modeValue, setModeValue] = useState<number>(3);

  // Game state
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(modeValue);
  const [timeLeft, setTimeLeft] = useState(modeValue);
  const [questionsLeft, setQuestionsLeft] = useState(modeValue);
  const [current, setCurrent] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup game when mode/modeValue changes
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, modeValue, letters]);

  // Timer for "time" mode
  useEffect(() => {
    if (gameActive && mode === "time") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive, mode]);

  function resetGame() {
    setScore(0);
    setInput("");
    setFeedback(null);
    setCurrent(letters[Math.floor(Math.random() * letters.length)]);
    setGameActive(false);

    if (mode === "lives") setLives(modeValue);
    if (mode === "time") setTimeLeft(modeValue);
    if (mode === "questions") setQuestionsLeft(modeValue);
  }

  function startGame() {
    setGameActive(true);
    setScore(0);
    setInput("");
    setFeedback(null);
    setCurrent(letters[Math.floor(Math.random() * letters.length)]);
    if (mode === "lives") setLives(modeValue);
    if (mode === "time") setTimeLeft(modeValue);
    if (mode === "questions") setQuestionsLeft(modeValue);
  }

  function endGame() {
    setGameActive(false);
    setFeedback(`Game Over! Your score: ${score}`);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function checkAnswer() {
    if (!current || !gameActive) return;
    let correct = morseMap[current];
    let isCorrect = input.trim() === correct;
    let nextQuestion = () => setCurrent(letters[Math.floor(Math.random() * letters.length)]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! Correct: ${correct}`);
      if (mode === "lives") setLives((prev) => prev - 1);
    }

    if (mode === "questions") setQuestionsLeft((prev) => prev - 1);

    setTimeout(() => {
      setInput("");
      setFeedback(null);

      // Check for end conditions
      if (mode === "lives" && lives - (isCorrect ? 0 : 1) <= 0) {
        endGame();
        return;
      }
      if (mode === "questions" && questionsLeft - 1 <= 0) {
        endGame();
        return;
      }
      if (mode === "time" && timeLeft <= 0) {
        endGame();
        return;
      }
      nextQuestion();
    }, 1000);
  }

  // Button input
  function handleDot() {
    if (gameActive) setInput((prev) => prev + ".");
  }
  function handleDash() {
    if (gameActive) setInput((prev) => prev + "-");
  }
  function handleClear() {
    if (gameActive) setInput("");
  }

  // Mode selector
  function renderModeOptions() {
    if (mode === "lives")
      return (
        <div className="flex gap-2">
          {livesOptions.map((v) => (
            <button
              key={v}
              onClick={() => setModeValue(v)}
              className={`px-3 py-1 rounded border ${modeValue === v ? "bg-blue-500 text-white font-bold" : "bg-gray-100"}`}
            >
              {v} Lives
            </button>
          ))}
        </div>
      );
    if (mode === "time")
      return (
        <div className="flex gap-2">
          {timeOptions.map((v) => (
            <button
              key={v}
              onClick={() => setModeValue(v)}
              className={`px-3 py-1 rounded border ${modeValue === v ? "bg-blue-500 text-white font-bold" : "bg-gray-100"}`}
            >
              {v} sec
            </button>
          ))}
        </div>
      );
    if (mode === "questions")
      return (
        <div className="flex gap-2">
          {questionOptions.map((v) => (
            <button
              key={v}
              onClick={() => setModeValue(v)}
              className={`px-3 py-1 rounded border ${modeValue === v ? "bg-blue-500 text-white font-bold" : "bg-gray-100"}`}
            >
              {v} Qs
            </button>
          ))}
        </div>
      );
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="font-semibold mb-2">Testing Mode</h2>
      <div className="flex gap-4 items-center mb-4">
        {modes.map((m) => (
          <button
            key={m.key}
            className={`px-3 py-1 rounded border ${
              mode === m.key ? "bg-blue-500 text-white font-bold" : "bg-gray-100"
            }`}
            onClick={() => setMode(m.key as any)}
            disabled={gameActive}
          >
            {m.label}
          </button>
        ))}
        {renderModeOptions()}
      </div>

      {!gameActive ? (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-500 text-white rounded mb-4"
        >
          Start Game
        </button>
      ) : (
        <button
          onClick={endGame}
          className="px-4 py-2 bg-red-500 text-white rounded mb-4"
        >
          End Game
        </button>
      )}

      <div className="border rounded p-4 mb-2 bg-white min-h-[140px]">
        {!gameActive && <div className="text-gray-400">Press "Start Game" to begin!</div>}
        {gameActive && current && (
          <>
            <div className="text-lg mb-2">
              Letter: <span className="font-bold">{current}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <button onClick={handleDot} className="px-3 py-2 bg-gray-200 rounded font-mono text-lg">.</button>
              <button onClick={handleDash} className="px-3 py-2 bg-gray-200 rounded font-mono text-lg">-</button>
              <button onClick={handleClear} className="px-3 py-2 bg-gray-100 rounded font-mono text-base">Clear</button>
            </div>
            <input
              value={input}
              readOnly
              className="border p-2 rounded w-full mb-2 font-mono text-xl"
              style={{ background: "#f9f9f9" }}
            />
            <button
              onClick={checkAnswer}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!input}
            >
              Submit
            </button>
          </>
        )}
        {feedback && (
          <div className="mt-2 text-xl font-bold">{feedback}</div>
        )}
      </div>

      {/* Info Display */}
      <div className="flex gap-8 mt-2 text-gray-700 font-mono">
        <span>Score: {score}</span>
        {mode === "lives" && <span>Lives: {lives}</span>}
        {mode === "time" && <span>Time: {timeLeft}s</span>}
        {mode === "questions" && <span>Questions left: {questionsLeft}</span>}
      </div>
    </div>
  );
}