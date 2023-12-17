import { writable } from "svelte/store";

enum GameStage {
  FILE,
  TEAMS,
  BOARD,
  WINNER,
}

const gameStage = writable(GameStage.FILE);
