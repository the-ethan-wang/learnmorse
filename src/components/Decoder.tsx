"use client";
import { useState } from "react";
import { decode } from "../lib/morse";

export default function Decoder() {
  const [morse, setMorse] = useState("");
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Decode from Morse</h2>
      <input
        value={morse}
        onChange={e => setMorse(e.target.value)}
        placeholder="Enter morse"
        className="border p-2 rounded w-full"
      />
      <div className="mt-2 text-purple-700 font-mono">{decode(morse)}</div>
    </div>
  );
}