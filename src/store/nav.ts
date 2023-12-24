import { persistable } from "./persistable";

function createNavStore() {
  const navStore = persistable("nav", { back: true, next: true });

  return {
    ...navStore,
    setBack: (enabled: boolean) => {
      navStore.update(({ next }) => ({ back: enabled, next }));
    },
    setNext: (enabled: boolean) => {
      navStore.update(({ back }) => ({ back, next: enabled }));
    },
  };
}

export const nav = createNavStore();
