"use client";
import { useState } from "react";
import Encoder from "../components/Encoder";
import Decoder from "../components/Decoder";
import LetterSelector from "../components/LetterSelector";
import TestArea from "../components/TestArea";
import MorseSidebar from "../components/MorseTable";
import { morseMap } from "../lib/morse";

export default function HomePage() {
  const [letters, setLetters] = useState<string[]>(Object.keys(morseMap));
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Learn Morse Code</h1>
          <Encoder />
          <Decoder />
          <LetterSelector onChange={setLetters} />
          <TestArea letters={letters} />
        </div>
        <MorseSidebar />
      </div>
    </main>
  );
}