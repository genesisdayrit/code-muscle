// src/app/lib/commandHandler.ts

import { ExerciseState, Mode } from "./exerciseTypes";

// Helper: Clone a 2D position
const clonePosition = (pos: [number, number]): [number, number] => [pos[0], pos[1]];

export function processCommand(
  command: string,
  state: ExerciseState
): ExerciseState {
  // Start with the existing state
  let newState: ExerciseState = { ...state };

  // Record the command in history regardless of mode
  newState.commandHistory = [...state.commandHistory, command];

  // We'll branch based on the current mode:
  if (state.mode === "normal") {
    // Normal Mode: Movement and mode switching
    switch (command) {
      case "h":
      case "j":
      case "k":
      case "l": {
        let [row, col] = state.cursorPosition;
        const numRows = state.currentText.length;
        const numCols = state.currentText[0]?.length || 0;
        switch (command) {
          case "h":
            col = Math.max(0, col - 1);
            break;
          case "l":
            col = Math.min(numCols - 1, col + 1);
            break;
          case "k":
            row = Math.max(0, row - 1);
            break;
          case "j":
            row = Math.min(numRows - 1, row + 1);
            break;
        }
        newState.cursorPosition = [row, col];
        break;
      }
      case "i":
        // Switch to Insert Mode
        newState.mode = "insert";
        break;
      case "v":
        // Switch to Visual Mode and mark the starting point
        newState.mode = "visual";
        newState.selectionStart = clonePosition(state.cursorPosition);
        break;
      default:
        // For unhandled commands in normal mode, do nothing.
        break;
    }
  } else if (state.mode === "insert") {
    // Insert Mode: Insert the typed character into the grid.
    // We assume that each key (except Escape) is inserted at the current cursor position.
    if (command === "Escape") {
      // Return to normal mode
      newState.mode = "normal";
    } else {
      // Insert character into the current text.
      // For simplicity, we replace the character at the current cursor.
      let { currentText, cursorPosition } = state;
      const [row, col] = cursorPosition;
      const line = currentText[row];
      // Create a new line with the inserted character:
      // (In a more complete implementation, you might want to splice in characters)
      const newLine =
        line.substring(0, col) + command + line.substring(col + 1);
      currentText[row] = newLine;
      newState.currentText = [...currentText];
      // Optionally, move the cursor right after insertion
      const numCols = newLine.length;
      newState.cursorPosition = [row, Math.min(col + 1, numCols - 1)];
    }
  } else if (state.mode === "visual") {
    // Visual Mode: Movement commands update the cursor while maintaining a selection.
    switch (command) {
      case "h":
      case "j":
      case "k":
      case "l": {
        let [row, col] = state.cursorPosition;
        const numRows = state.currentText.length;
        const numCols = state.currentText[0]?.length || 0;
        switch (command) {
          case "h":
            col = Math.max(0, col - 1);
            break;
          case "l":
            col = Math.min(numCols - 1, col + 1);
            break;
          case "k":
            row = Math.max(0, row - 1);
            break;
          case "j":
            row = Math.min(numRows - 1, row + 1);
            break;
        }
        newState.cursorPosition = [row, col];
        break;
      }
      case "Escape":
        // Exit Visual Mode without performing an action
        newState.mode = "normal";
        newState.selectionStart = undefined;
        break;
      default:
        // Other commands in visual mode can be added here (e.g., deleting the selection)
        break;
    }
  }

  return newState;
}

