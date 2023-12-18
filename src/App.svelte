<script lang="ts">
  import File from "./lib/File.svelte";
  import Teams from "./lib/Teams.svelte";
  import { Stage, stage } from "./store/stage";
</script>

<main>
  <h1>Jeopardy</h1>
  <button on:click={stage.file}>FILE</button>
  <button on:click={stage.teams}>TEAMS</button>
  <button on:click={stage.board}>BOARD</button>
  <button on:click={stage.winner}>WINNER</button>

  {#if $stage === Stage.FILE}
    <File />
  {:else if $stage === Stage.TEAMS}
    <Teams />
  {:else if $stage === Stage.BOARD}
    <div>Board</div>
  {:else if $stage === Stage.WINNER}
    <div>Winner</div>
  {:else}
    <h1>Unreachable</h1>
  {/if}
</main>

<style>
</style>
