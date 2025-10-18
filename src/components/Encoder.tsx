"use client";
import { useState } from "react";
import { encode } from "../lib/morse";

export default function Encoder() {
  const [text, setText] = useState("");
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Encode to Morse</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text"
        className="border p-2 rounded w-full"
      />
      <div className="mt-2 text-green-700 font-mono">{encode(text)}</div>
    </div>
  );
}