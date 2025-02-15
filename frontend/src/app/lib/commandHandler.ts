// src/app/lib/commandHandler.ts

import { ExerciseState } from "./exerciseTypes";

// Helper: Clone a 2D position
const clonePosition = (pos: [number, number]): [number, number] => [pos[0], pos[1]];

export function processCommand(
  command: string,
  state: ExerciseState
): ExerciseState {
  // Destructure current state
  let [row, col] = state.cursorPosition;
  const numRows = state.currentText.length;
  const numCols = state.currentText[0]?.length || 0;

  // Process movement commands
  switch (command) {
    case "h": // Move left
      col = Math.max(0, col - 1);
      break;
    case "l": // Move right
      col = Math.min(numCols - 1, col + 1);
      break;
    case "k": // Move up
      row = Math.max(0, row - 1);
      break;
    case "j": // Move down
      row = Math.min(numRows - 1, row + 1);
      break;
    default:
      // For now, ignore any commands that are not movement commands.
      break;
  }

  // Update the state with the new cursor position and add to history
  const updatedState: ExerciseState = {
    ...state,
    cursorPosition: [row, col],
    commandHistory: [...state.commandHistory, command],
  };

  // Here you can add validation logic to check if the exercise goal is met.
  // For Phase 1, we keep it simple.

  return updatedState;
}

