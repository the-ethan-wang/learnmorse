"use client";
import { useState, useEffect } from "react";
import { morseMap, decode } from "../lib/morse";

export default function TestArea({ letters }: { letters: string[] }) {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Only pick a random letter on the client, after mount
  useEffect(() => {
    if (letters.length > 0) {
      setCurrent(letters[Math.floor(Math.random() * letters.length)]);
    }
  }, [letters]);

  function checkAnswer() {
    if (!current) return;
    let correct;
    if (mode === "encode") {
      correct = morseMap[current];
      setFeedback(input.trim() === correct ? "Correct!" : `Wrong. Answer: ${correct}`);
      setScore(input.trim() === correct ? score + 1 : score);
    } else {
      correct = current;
      setFeedback(decode(input.trim()) === correct ? "Correct!" : `Wrong. Answer: ${correct}`);
      setScore(decode(input.trim()) === correct ? score + 1 : score);
    }
    setTimeout(() => {
      setCurrent(letters[Math.floor(Math.random() * letters.length)]);
      setInput("");
      setFeedback(null);
    }, 1000);
  }

  if (!current) {
    // Optionally show a loading state until first random letter is picked
    return <div className="mt-8">Loading test...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="font-semibold">Testing Mode</h2>
      <div className="flex gap-4 items-center mb-2">
        <button
          className={`px-3 py-1 rounded ${mode === "encode" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => setMode("encode")}
        >Encode</button>
        <button
          className={`px-3 py-1 rounded ${mode === "decode" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => setMode("decode")}
        >Decode</button>
      </div>
      <div className="border rounded p-4 mb-2 bg-white">
        {mode === "encode" ? (
          <div>
            <div className="text-lg mb-2">Letter: <span className="font-bold">{current}</span></div>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter morse code"
              className="border p-2 rounded w-full mb-2"
            />
          </div>
        ) : (
          <div>
            <div className="text-lg mb-2">Morse: <span className="font-mono font-bold">{morseMap[current]}</span></div>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter letter"
              className="border p-2 rounded w-full mb-2"
            />
          </div>
        )}
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={checkAnswer}>Check</button>
        {feedback && <div className="mt-2 text-xl">{feedback}</div>}
      </div>
      <div className="text-gray-700">Score: {score}</div>
    </div>
  );
}