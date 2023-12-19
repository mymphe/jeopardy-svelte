import { derived } from "svelte/store";
import { persistable } from "./persistable";
import { game } from "./game";

export const round = persistable("round", 0);

export const cursor = persistable<[number, number, number] | null>(
  "cursor",
  null
);

export const categories = derived([game, round], ([_game, _round]) =>
  _game.length ? _game[_round] : []
);

export const active = derived([game, cursor], ([_game, _cursor]) => {
  if (!_game.length) return null;

  if (_cursor) {
    const [i, j, k] = _cursor;

    return _game[i][j].clues[k];
  }

  return null;
});
