import { localStorable } from "./localStorable";

export enum GameStage {
  FILE,
  TEAMS,
  BOARD,
  WINNER,
}

const GAME_STAGE_KEY = "GAME_STAGE";

export const gameStageStore = localStorable<GameStage>(
  GAME_STAGE_KEY,
  GameStage.FILE
);
