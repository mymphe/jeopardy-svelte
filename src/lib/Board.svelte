<script lang="ts">
  import { derived } from "svelte/store";
  import { game } from "../store/game";
  import { persistable } from "../store/persistable";
  import { teams } from "../store/teams";

  const round = persistable("round", 0);
  const categories = derived([game, round], ([_game, _round]) => _game[_round]);

  const rounds = $game.length;

  const cursor = persistable<[number, number, number] | null>("cursor", null);

  const active = derived([game, cursor], ([_game, _cursor]) => {
    if (_cursor) {
      const [i, j, k] = _cursor;

      return _game[i][j].clues[k];
    }

    return null;
  });
</script>

<div>
  {#each $categories as { name, clues }}
    <p>{name}</p>
    {#each clues as { hidden, price, path }}
      <button disabled={hidden} on:click={() => cursor.set(path)}
        >{price}</button
      >
    {/each}
  {/each}
  <hr />
  <div>
    <button
      disabled={$round === 0}
      type="button"
      on:click={() => round.update((r) => --r)}>👈</button
    >
    <span>{$round + 1} / {rounds}</span>
    <button
      disabled={$round === rounds - 1}
      type="button"
      on:click={() => round.update((r) => ++r)}>👉</button
    >
  </div>
  {#if $active}
    <div>
      <h2>{$active.price}</h2>
      <p>{$active.clue}</p>
      <hr />
      <div>
        {#each $teams as { name }}
          <div>
            <p>{name}</p>
            <button
              disabled={$active.wrong.includes(name) || !!$active.correct}
              type="button"
              on:click={() => {
                if ($active) {
                  game.answer(name, true, $active.path);
                }
              }}>👍</button
            >
            <button
              disabled={!!$active.correct || $active.wrong.includes(name)}
              type="button"
              on:click={() => {
                if ($active) {
                  game.answer(name, false, $active.path);
                }
              }}>👎</button
            >
          </div>
        {/each}
      </div>
      <hr />
      <button on:click={() => cursor.set(null)} type="button">Закрыть</button>
    </div>
  {/if}
</div>
