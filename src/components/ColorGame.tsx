import { useColorStore, type Color } from "../store";
import { useEffect, useState } from "react";

export default function ColorGame() {
  const { options, reset } = useColorStore();

  const [optionLength, setOptionLength] = useState(options.length);

  useEffect(() => {
    reset(optionLength);
  }, [optionLength, reset]);

  const colorMap: Record<Color, string> = {
    red: "text-red-500",
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 h-screen justify-center">
      <h1 className="text-2xl font-bold">🎨 Color Brain</h1>

      <div className="flex flex-col items-center space-y-2">
        <label className="flex items-center gap-2">
          🎯 Option Count:
          <input
            type="number"
            className="border px-2 py-1 rounded w-20 text-center"
            value={optionLength}
            min={1}
            max={10}
            onChange={(e) => setOptionLength(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-[80%]">
        {options.slice(0, optionLength).map((option, index) => (
          <p
            key={index}
            className={`w-1/4 text-[40px] lg:text-[80px] ${
              colorMap[option.color]
            } font-bold text-center`}
          >
            {option.text}
          </p>
        ))}
      </div>

      <button
        onClick={() => reset(optionLength)}
        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-sm transition cursor-pointer"
      >
        🔄 Reset
      </button>
    </div>
  );
}
