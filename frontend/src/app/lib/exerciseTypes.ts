// src/app/lib/exerciseTypes.ts

export type Mode = "normal" | "insert" | "visual";

export interface Exercise {
  id: string;
  title: string;
  instructions: string;
  startingText: string | string[];
  targetText?: string | string[];
  startPosition?: [number, number];
  targetPosition?: [number, number];
  validCommands: string[];
}

export interface ExerciseState {
  currentText: string[];
  cursorPosition: [number, number];
  commandHistory: string[];
  isComplete: boolean;
  mode: Mode;
  // When in visual mode, store the start of the selection
  selectionStart?: [number, number];
}

