import { get } from "svelte/store";
import { persistable } from "./persistable";
import { teams } from "./teams";

export interface Clue {
  clue: string;
  price: number;
  hidden: boolean;
  wrong: string[];
  correct: string | null;
  path: [number, number, number];
}

interface Category {
  name: string;
  clues: Clue[];
}

type Round = Category[];
type Game = Round[];

function createGameStore() {
  const gameStore = persistable<Game>("data", []);

  function transform(json: string): Game {
    const data: any = JSON.parse(json);

    for (const [i, round] of data.entries()) {
      for (const [j, category] of round.entries()) {
        category.name = category.category;
        delete category.category;

        const clues = [];
        let k = 0;

        for (const [price, clue] of Object.entries(category.clues)) {
          clues.push({
            price: +price,
            clue,
            hidden: false,
            wrong: [],
            correct: null,
            path: [i, j, k],
          });

          k += 1;
        }

        category.clues = clues;
      }
    }

    return data;
  }

  return {
    ...gameStore,
    transform,
    answer: (
      teamName: string,
      correct: boolean,
      cluePath: [number, number, number]
    ) => {
      gameStore.update((game) => {
        const [i, j, k] = cluePath;

        const clue = game[i][j].clues[k];
        const delta = correct ? clue.price : clue.price * -1;

        teams.updateScore(teamName, delta);

        if (correct && clue.correct !== teamName) {
          clue.correct = teamName;
          clue.hidden = true;
        } else {
          clue.wrong = [...clue.wrong, teamName];
          clue.hidden = clue.wrong.length === get(teams).length;
        }

        return game;
      });
    },
  };
}

export const game = createGameStore();
