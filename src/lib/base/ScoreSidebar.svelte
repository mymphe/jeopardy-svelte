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
      {#if $active && !$active.correct && !$active?.wrong.includes(name)}
        <button
          class="answer-correct"
          disabled={$active.wrong.includes(name) || !!$active.correct}
          type="button"
          on:click={() => {
            if ($active) {
              game.answer(name, true, $active.path);
            }
          }}>🥳</button
        >
      {/if}
      <p class="team-name">
        {name}
      </p>
      {#if $stage === Stage.TEAMS}
        <button type="button" class="remove" on:click={() => teams.remove(name)}
          >✕</button
        >
      {:else}
        <div class="score {score < 0 ? 'red' : 'green'}">
          {score}
        </div>
      {/if}
      {#if $active && !$active.correct && !$active?.wrong.includes(name)}
        <button
          class="answer-wrong"
          disabled={$active.wrong.includes(name) || !!$active.correct}
          type="button"
          on:click={() => {
            if ($active) {
              game.answer(name, false, $active.path);
            }
          }}>🤦‍♀️</button
        >
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
    width: 5ch;
    text-align: right;
    padding: 0.2rem;
    font-weight: 600;
  }

  .score.red {
    color: red;
  }

  .score.green {
    color: rgb(0, 180, 0);
  }

  .sidebar-team {
    display: flex;
    justify-content: start;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    background-color: white;
    position: relative;
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

  button {
    font-size: 1.3rem;
  }

  button:hover {
    transform: scale(1.2);
  }

  button:active {
    transform: scale(0.9);
  }

  .answer-correct {
    position: absolute;
    top: -30px;
  }

  .left .answer-correct {
    left: 65%;
  }

  .right .answer-correct {
    right: 65%;
  }

  .answer-wrong {
    position: absolute;
    bottom: -30px;
  }

  .left .answer-wrong {
    left: 65%;
  }

  .right .answer-wrong {
    right: 65%;
  }
</style>
