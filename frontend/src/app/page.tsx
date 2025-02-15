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
  mode: "normal",
};

export default function Home() {
  const [exerciseState, setExerciseState] = useState<ExerciseState>(initialState);
  const textGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textGridRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // For Insert Mode, we want to capture all keys (except maybe special ones)
    // For simplicity, we assume that in Insert Mode, every key is inserted
    // while in Normal and Visual Mode, we only capture specific commands.
    let command = e.key;

    // Prevent default browser actions
    e.preventDefault();

    // Process command based on current mode
    const newState = processCommand(command, exerciseState);
    setExerciseState(newState);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Code-Muscle: Vim Training Tool (Phase 1)</h1>

      <div className="mb-4 p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-semibold">Exercise: Basic Movement & Editing</h2>
        <p>
          <strong>Normal Mode:</strong> Use <code>h</code>, <code>j</code>, <code>k</code>, <code>l</code> to move; press <code>i</code> to insert; press <code>v</code> for visual mode.
        </p>
        <p>
          <strong>Insert Mode:</strong> Type text; press <code>Escape</code> to return to normal.
        </p>
        <p>
          <strong>Visual Mode:</strong> Use movement keys to adjust selection; press <code>Escape</code> to cancel.
        </p>
        <p>
          <em>Current Mode: {exerciseState.mode.toUpperCase()}</em>
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

