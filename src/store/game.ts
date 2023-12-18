import type { Writable } from "svelte/store";
import { persistable } from "./persistable";

interface Clue {
  clue: string;
  price: number;
  hidden: boolean;
  wrong: string[];
  correct: string | null;
}

interface Category {
  name: string;
  clues: Clue[];
}

type Round = Category[];
type Game = Round[];

interface GameManager extends Writable<Game> {}

function createGameStore() {
  const gameStore = persistable<Game>("data", []);

  function transform(json: string): Game {
    const data: any = JSON.parse(json);

    for (const round of data) {
      for (const category of round) {
        const clues = [];

        for (const [price, clue] of Object.entries(category.clues)) {
          clues.push({
            price: +price,
            clue,
            hidden: false,
            wrong: [],
            correct: null,
          });
        }

        category.clues = clues;
      }
    }

    return data;
  }

  return {
    ...gameStore,
    transform,
  };
}

export const game = createGameStore();
