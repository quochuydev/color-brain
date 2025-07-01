import { create } from "zustand";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"] as const;
type Color = (typeof COLORS)[number];

type GameState = {
  currentColor: Color;
  options: Color[];
  score: number;
  guess: (color: Color) => void;
  nextRound: () => void;
  reset: () => void;
};

const getRandomColor = (): Color =>
  COLORS[Math.floor(Math.random() * COLORS.length)];

const getOptions = (answer: Color): Color[] => {
  const others = COLORS.filter((c) => c !== answer);
  const shuffled = [...others.sort(() => 0.5 - Math.random())];
  return [answer, ...shuffled.slice(0, 2)].sort(() => 0.5 - Math.random());
};

export const useColorStore = create<GameState>((set) => {
  const answer = getRandomColor();
  return {
    currentColor: answer,
    options: getOptions(answer),
    score: 0,
    guess: (selected) =>
      set((state) => ({
        score: selected === state.currentColor ? state.score + 1 : state.score,
      })),
    nextRound: () => {
      const next = getRandomColor();
      set({
        currentColor: next,
        options: getOptions(next),
      });
    },
    reset: () =>
      set(() => {
        const answer = getRandomColor();
        return {
          score: 0,
          currentColor: answer,
          options: getOptions(answer),
        };
      }),
  };
});
