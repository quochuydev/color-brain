import { create } from "zustand";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"] as const;

export type Color = (typeof COLORS)[number];

type GameState = {
  options: Array<{
    color: Color;
    text: Color;
  }>;
  reset: (length?: number) => void;
};

const getRandomColor = (): Color =>
  COLORS[Math.floor(Math.random() * COLORS.length)];

const getOptions = (
  length?: number
): Array<{
  color: Color;
  text: Color;
}> => {
  return Array.from({ length: length || 3 }, () => ({
    color: getRandomColor(),
    text: getRandomColor(),
  }));
};

export const useColorStore = create<GameState>((set) => {
  return {
    options: getOptions(),
    reset: (length?: number) =>
      set(() => {
        return {
          options: getOptions(length),
        };
      }),
  };
});
