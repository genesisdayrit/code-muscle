// src/app/components/TextGrid.tsx

import React from "react";

interface TextGridProps {
  text: string[];
  cursorPosition: [number, number];
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const TextGrid: React.FC<TextGridProps> = ({ text, cursorPosition, onKeyDown }) => {
  return (
    <div
      className="p-4 border rounded bg-black text-white"
      style={{ fontFamily: "monospace", whiteSpace: "pre", lineHeight: "1.5" }}
      tabIndex={0} // Make the div focusable
      onKeyDown={onKeyDown}
    >
      {text.map((line, rowIndex) => {
        const isCursorRow = rowIndex === cursorPosition[0];
        const lineChars = line.split("");
        if (isCursorRow) {
          const col = cursorPosition[1];
          // Insert a visual marker for the cursor; adjust as needed
          lineChars[col] = `[${lineChars[col] || " "}]`;
        }
        return <div key={rowIndex}>{lineChars.join("")}</div>;
      })}
    </div>
  );
};

export default TextGrid;

