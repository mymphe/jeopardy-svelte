import { persistable } from "./localStorable";

export interface Clue {
  clue: string;
  disabled: boolean;
}

export type CluePrice =
  | "200"
  | "400"
  | "600"
  | "800"
  | "1000"
  | "1200"
  | "1600"
  | "2000";

export type GameCategory = Record<CluePrice, Clue>;
export type GameRound = Array<GameCategory>;
export type GameData = Array<GameRound>;

export const gameDataStore = persistable<GameData>("data", []);
