import { writable } from "svelte/store";

export function localStorable<T>(key: string, defaultValue?: T) {
  const value = fromLocalStorage<T>(key) || defaultValue;
  const store = writable<T>(value);

  store.subscribe((newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  });

  return store;
}

function fromLocalStorage<T>(key: string): T | null {
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }

  return null;
}
