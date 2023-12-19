<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Teams from "./lib/Teams.svelte";
  import Winner from "./lib/Winner.svelte";
  import { Stage, stage } from "./store/stage";
  import { teams } from "./store/teams";
</script>

<main>
  <h1>Jeopardy</h1>
  <div>
    {#each $teams as { name, score }}
      <p>{name}: {score}</p>
    {/each}
  </div>
  <button on:click={stage.file}>FILE</button>
  <button on:click={stage.teams}>TEAMS</button>
  <button on:click={stage.board}>BOARD</button>
  <button on:click={stage.winner}>WINNER</button>

  {#if $stage === Stage.FILE}
    <File />
  {:else if $stage === Stage.TEAMS}
    <Teams />
  {:else if $stage === Stage.BOARD}
    <Board />
  {:else if $stage === Stage.WINNER}
    <Winner />
  {:else}
    <h1>Unreachable</h1>
  {/if}
</main>

<style>
</style>
