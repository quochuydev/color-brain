import React from "react";
import { useColorStore } from "../store";

export default function ColorGame() {
  const { currentColor, options, score, guess, nextRound } = useColorStore();

  const handleGuess = (color: string) => {
    guess(color as any);
    setTimeout(() => nextRound(), 1000);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">🎨 Color Brain</h1>
      <div
        className="w-32 h-32 rounded shadow"
        style={{ backgroundColor: currentColor }}
      />
      <div className="flex gap-4">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => handleGuess(color)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
          >
            {color.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="text-lg">Score: {score}</p>
    </div>
  );
}
