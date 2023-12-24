import { persistable } from "./persistable";

export enum Stage {
  FILE,
  TEAMS,
  BOARD,
  WINNER,
}

function createStageStore() {
  const stageStore = persistable<Stage>("stage", Stage.FILE);

  return {
    ...stageStore,
    file: () => stageStore.set(Stage.FILE),
    teams: () => stageStore.set(Stage.TEAMS),
    board: () => stageStore.set(Stage.BOARD),
    winner: () => stageStore.set(Stage.WINNER),
    back: () =>
      stageStore.update((stage) => (stage > Stage.FILE ? stage - 1 : stage)),
    next: () =>
      stageStore.update((stage) => (stage < Stage.WINNER ? stage + 1 : stage)),
  };
}

export const stage = createStageStore();
