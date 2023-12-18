import { persistable } from "./localStorable";

export interface Team {
  name: string;
  score: number;
  finalRound: {
    guess: string;
    stake: number;
  };
}

export const teamStore = persistable<Team[]>("TEAMS", []);
