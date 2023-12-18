import { get, type Writable } from "svelte/store";
import { localStorable } from "./localStorable";

export enum Stage {
  FILE,
  TEAMS,
  BOARD,
  WINNER,
}

const STAGE_KEY = "stage";

interface StageManager extends Writable<Stage> {
  file: () => void;
  teams: () => void;
  board: () => void;
  winner: () => void;
}

const stageStore = localStorable<Stage>(STAGE_KEY, Stage.FILE);

export const stage: StageManager = {
  ...stageStore,
  file: () => stageStore.set(Stage.FILE),
  teams: () => stageStore.set(Stage.TEAMS),
  board: () => stageStore.set(Stage.BOARD),
  winner: () => stageStore.set(Stage.WINNER),
};
