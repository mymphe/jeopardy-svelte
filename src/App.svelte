<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Teams from "./lib/Teams.svelte";
  import Winner from "./lib/Winner.svelte";
  import { Stage, stage } from "./store/stage";
  import { teams } from "./store/teams";
</script>

<main>
  <header>
    <h1 id="title">🔔 Гэнгизхан 🔔</h1>
  </header>
  <div>
    {#each $teams as { name, score }}
      <p>{name}: {score}</p>
    {/each}
  </div>

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
  main {
    width: 100vw;
    height: 100vh;

    background: radial-gradient(#056724, #023516);
    color: #f5f1ed;

    text-align: center;
    padding: 3rem;
  }

  #title {
    font-family: "Ruslan Display";
    font-size: 5rem;
    color: rgb(255, 255, 255);
  }
</style>
