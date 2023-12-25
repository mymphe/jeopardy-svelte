<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Teams from "./lib/Teams.svelte";
  import Winner from "./lib/Winner.svelte";
  import { nav } from "./store/nav";
  import { Stage, stage } from "./store/stage";
  import { teams } from "./store/teams";
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
  <Footer />
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
</style>
