<script lang="ts">
  import { derived } from "svelte/store";
  import { active } from "../../store/board";
  import { game } from "../../store/game";
  import { Stage, stage } from "../../store/stage";
  import { teams } from "../../store/teams";

  enum Orientation {
    left,
    right,
  }

  export let orientation: Orientation = Orientation.left;

  const displayed = derived([teams], ([teams]) =>
    teams.filter((_, i) => i % 2 === orientation)
  );
</script>

<div class="score {orientation ? 'right' : 'left'}">
  {#each $displayed as { name, score }}
    <div class="item">
      <span class="name">
        {name}
      </span>
      <span>&nbsp;</span>
      {#if $stage === Stage.TEAMS}
        <button type="button" on:click={() => teams.remove(name)}>✕</button>
      {:else}
        <span class="numbers">
          {score}
        </span>
      {/if}
      {#if $active && !$active.correct && !$active?.wrong.includes(name)}
        <div class="updown">
          <button
            class="answer-correct"
            disabled={$active.wrong.includes(name) || !!$active.correct}
            type="button"
            on:click={() => {
              if ($active) {
                game.answer(name, true, $active.path);
              }
            }}>✓</button
          >
          <button
            class="answer-wrong"
            disabled={!!$active.correct || $active.wrong.includes(name)}
            type="button"
            on:click={() => {
              if ($active) {
                game.answer(name, false, $active.path);
              }
            }}>✕</button
          >
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .score {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left {
    left: 1rem;
    align-items: start;
  }

  .right {
    right: 1rem;
    align-items: end;
  }

  .name {
    font-size: 1rem;
  }

  .numbers {
    font-size: 1rem;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .updown {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  button {
    appearance: none;
    font-size: 1rem;
    color: red !important;
    border-radius: 50%;
    color: black;
    padding: 0.2rem 0.5rem;
    font-family: "Tektur", sans-serif;
  }

  button:disabled {
    opacity: 0.3;
  }

  button:active:enabled {
    transform: translate(2px, 2px);
  }

  .answer-correct {
    color: rgb(0, 180, 0) !important;
  }
</style>
