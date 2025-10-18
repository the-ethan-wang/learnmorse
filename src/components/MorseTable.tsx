"use client";
import { useState } from "react";
import { morseMap } from "../lib/morse";

const letters = Object.entries(morseMap).filter(
  ([char]) => char >= "A" && char <= "Z"
);
const numbers = Object.entries(morseMap).filter(
  ([char]) => char >= "0" && char <= "9"
);

export default function MorseSidebar() {
  const [show, setShow] = useState(true);

  return (
    <>
      {/* Sidebar - slides in/out */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-40 w-64 bg-gray-50 border-l shadow-lg p-4
          transition-transform duration-300 ease-in-out
          ${show ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
        style={{ willChange: "transform" }}
      >
        <button
          onClick={() => setShow(false)}
          className="mb-4 px-3 py-1 bg-blue-500 text-white rounded shadow self-end"
          aria-label="Hide Morse Table"
        >
          Hide
        </button>
        <h3 className="font-bold text-lg mb-2 mt-4">Letters</h3>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {letters.map(([char, code]) => (
            <div key={char} className="bg-white rounded shadow p-2 flex flex-col items-center">
              <span className="text-lg font-bold">{char}</span>
              <span className="text-blue-600 text-base">{code}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-lg mb-2">Numbers</h3>
        <div className="grid grid-cols-5 gap-2">
          {numbers.map(([char, code]) => (
            <div key={char} className="bg-white rounded shadow p-2 flex flex-col items-center">
              <span className="text-lg font-bold">{char}</span>
              <span className="text-blue-600 text-base">{code}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Fade-in "Show Morse Table" button (slides in as sidebar slides out) */}
      <button
        onClick={() => setShow(true)}
        className={`
          fixed right-0 top-1/2 z-50
          -translate-y-1/2
          bg-blue-500 text-white px-2 py-4 rounded-l shadow
          transition-all duration-300 ease-in-out
          ${show
            ? "opacity-0 pointer-events-none translate-x-12"
            : "opacity-100 pointer-events-auto translate-x-0"}
        `}
        aria-label="Show Morse Table"
        style={{ writingMode: "vertical-rl" }}
      >
        Show Morse Table
      </button>
    </>
  );
}