import type { Writable } from "svelte/store";
import { persistable } from "./localStorable";

interface Team {
  name: string;
  score: number;
}

type Teams = Team[];

interface TeamManager extends Writable<Teams> {
  add: (name: string) => void;
  remove: (name: string) => void;
}

const teamStore = persistable<Teams>("teams", []);

export const teams: TeamManager = {
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
};
