import { get, type Writable } from "svelte/store";
import { persistable } from "./persistable";

export enum Stage {
  FILE,
  TEAMS,
  BOARD,
  WINNER,
}

interface StageManager extends Writable<Stage> {
  file: () => void;
  teams: () => void;
  board: () => void;
  winner: () => void;
}

const stageStore = persistable<Stage>("stage", Stage.FILE);

export const stage: StageManager = {
  ...stageStore,
  file: () => stageStore.set(Stage.FILE),
  teams: () => stageStore.set(Stage.TEAMS),
  board: () => stageStore.set(Stage.BOARD),
  winner: () => stageStore.set(Stage.WINNER),
};
