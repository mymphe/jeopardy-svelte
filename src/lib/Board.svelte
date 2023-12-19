<script lang="ts">
  import { active, categories, cursor, round } from "../store/board";
  import { game } from "../store/game";
  import { stage } from "../store/stage";
  import { teams } from "../store/teams";

  const rounds = $game.length;
</script>

<div>
  {#each $categories as { name, clues }}
    <p>{name}</p>
    {#each clues as { hidden, price, path }}
      <button disabled={hidden} on:click={() => cursor.set(path)}
        >{price}</button
      >
    {/each}
  {:else}
    <p>No data</p>
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
      disabled={$round + 1 >= rounds}
      type="button"
      on:click={() => round.update((r) => ++r)}>👉</button
    >
  </div>
  {#if $round + 1 >= rounds}
    <div>
      <button type="button" on:click={() => stage.winner()}>Победитель</button>
    </div>
  {/if}
  {#if $active}
    <div class="clue">
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
      <button
        on:click={() => {
          if ($cursor) {
            game.hideClue($cursor);
            cursor.set(null);
          }
        }}
        type="button">Закрыть</button
      >
    </div>
  {/if}
</div>

<style>
  .clue {
    margin: 5rem;
    padding: 2rem;
    border: 1px solid black;
  }
</style>
