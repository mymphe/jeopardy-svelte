<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Teams from "./lib/Teams.svelte";
  import Winner from "./lib/Winner.svelte";
  import { nav } from "./store/nav";
  import { Stage, stage } from "./store/stage";
  import { teams } from "./store/teams";

  $: {
    if ($stage === Stage.FILE) {
      nav.setBack(false);
    } else if ($stage === Stage.WINNER) {
      nav.setNext(false);
    } else {
      nav.setBack(true);
      nav.setNext(true);
    }
  }
</script>

<main>
  <header>
    <h1 id="title">Гэнгизхан</h1>
    <div>
      {#each $teams as { name, score }}
        <p>{name}: {score}</p>
      {/each}
    </div>
  </header>
  <section>
    {#if $stage === Stage.FILE}
      <File />
    {:else if $stage === Stage.TEAMS}
      <Teams />
    {:else if $stage === Stage.BOARD}
      <Board />
    {:else if $stage === Stage.WINNER}
      <Winner />
    {:else}
      <p>Unreachable</p>
    {/if}
  </section>
  <footer>
    <button disabled={!$nav.back} on:click={stage.back}>Назад</button>
    <button disabled={!$nav.next} on:click={stage.next}>Далее</button>
  </footer>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;

    text-align: center;
  }

  header {
    padding: 1rem;
    width: 100%;
  }

  section {
    padding: 1rem;
    width: 100%;
  }

  footer {
    position: fixed;
    bottom: 0;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }
</style>
