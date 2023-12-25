<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Header from "./lib/Header.svelte";
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
  <Header />
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
  <footer>
    <button disabled={!$nav.back} on:click={stage.back}>Назад</button>
    <button disabled={!$nav.next} on:click={stage.next}>Далее</button>
  </footer>
</main>

<style>
  main {
    width: 100vw;
    min-width: 375px;
    height: 100vh;

    background: linear-gradient(0deg, #ffffaa, yellow);
    background-size: 200%;
    background-position: 20% 150%;
    font-family: "Tektur", sans-serif;
  }

  @media (max-width: 720px) {
    main {
      padding: 0 2rem;
    }
  }

  footer {
    height: 2vh;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
</style>
