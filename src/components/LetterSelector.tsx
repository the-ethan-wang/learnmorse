"use client";
import { useState } from "react";
import { morseMap } from "../lib/morse";

export default function LetterSelector({ onChange }: { onChange: (letters: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>(Object.keys(morseMap));

  function toggle(letter: string) {
    const newSelected = selected.includes(letter)
      ? selected.filter(l => l !== letter)
      : [...selected, letter];
    setSelected(newSelected);
    onChange(newSelected);
  }

  return (
    <div>
      <h3 className="font-medium mb-2">Choose letters for testing:</h3>
      <div className="flex flex-wrap gap-2">
        {Object.keys(morseMap).map((char) => (
          <button
            key={char}
            onClick={() => toggle(char)}
            className={`px-2 py-1 rounded border ${
              selected.includes(char) ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >{char}</button>
        ))}
      </div>
    </div>
  );
}