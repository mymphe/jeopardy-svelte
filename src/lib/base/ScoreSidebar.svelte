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

<div class="sidebar {orientation ? 'right' : 'left'}">
  {#each $displayed as { name, score }}
    <div class="sidebar-team">
      <p class="team-name">
        {name}
      </p>
      {#if $stage === Stage.TEAMS}
        <button type="button" class="remove" on:click={() => teams.remove(name)}
          >✕</button
        >
      {:else}
        <span class="score">
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
  .sidebar {
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

  .score {
    font-size: 1rem;
  }

  .sidebar-team {
    display: flex;
    justify-content: start;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    background-color: white;
  }

  .right .sidebar-team {
    flex-direction: row-reverse;
  }

  .team-name {
    padding: 0.2rem 0.4rem;
    font-size: 1.5rem;
  }

  .left .team-name {
    border-right: 2px solid black;
  }

  .right .team-name {
    border-left: 2px solid black;
  }

  .updown {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  button {
    appearance: none;
    font-size: 1.5rem;
    color: red !important;
    border-radius: 50%;
    color: black;
    padding: 0.2rem 0.5rem;
    font-family: "Tektur", sans-serif;
  }

  button:disabled {
    opacity: 0.3;
  }

  .remove:hover {
    transform: scale(1.2);
  }

  .remove:active {
    transform: scale(0.8);
  }

  .answer-correct {
    color: rgb(0, 180, 0) !important;
  }
</style>
