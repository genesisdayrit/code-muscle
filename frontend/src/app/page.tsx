// src/app/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import TextGrid from "./components/TextGrid";
import { processCommand } from "./lib/commandHandler";
import { ExerciseState } from "./lib/exerciseTypes";

const initialState: ExerciseState = {
  currentText: [
    ".......",
    ".......",
    "...X...",
    ".......",
    ".......",
  ],
  cursorPosition: [0, 0],
  commandHistory: [],
  isComplete: false,
};

export default function Home() {
  const [exerciseState, setExerciseState] = useState<ExerciseState>(initialState);
  const textGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textGridRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const command = e.key;
    if (["h", "j", "k", "l"].includes(command)) {
      const newState = processCommand(command, exerciseState);
      setExerciseState(newState);
    }
    e.preventDefault();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Code-Muscle: Vim Training Tool (Phase 1)</h1>

      <div className="mb-4 p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-semibold">Exercise: Basic Movement</h2>
        <p>
          Use <code>h</code> (left), <code>j</code> (down), <code>k</code> (up), <code>l</code> (right) to move the cursor.
        </p>
      </div>

      <TextGrid
        text={exerciseState.currentText}
        cursorPosition={exerciseState.cursorPosition}
        onKeyDown={handleKeyDown}
        ref={textGridRef}
      />

      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Command History:</h3>
        <div className="flex flex-wrap gap-2">
          {exerciseState.commandHistory.map((cmd, index) => (
            <span key={index} className="bg-gray-200 p-1 rounded">
              {cmd}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

