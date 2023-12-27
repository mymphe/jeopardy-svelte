import type { Writable } from "svelte/store";
import { persistable } from "./persistable";

export interface Team {
  name: string;
  score: number;
}

export type Teams = Team[];

const teamStore = persistable<Teams>("teams", []);

export const teams = {
  ...teamStore,
  add: (name: string) =>
    teamStore.update((prevTeams) => [
      ...prevTeams,
      {
        name,
        score: 0,
      },
    ]),
  remove: (name: string) =>
    teamStore.update((prevTeams) => prevTeams.filter((t) => t.name !== name)),
  updateScore: (teamName: string, delta: number) => {
    teamStore.update((teams) => {
      const team = teams.find((t) => t.name === teamName);
      team!.score += delta;

      return teams;
    });
  },
};
