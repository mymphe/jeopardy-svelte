<script lang="ts">
  import { gameStageStore, GameStage } from "./store/game-stage";

  let gameStage: GameStage;

  gameStageStore.subscribe((_gameStage) => {
    gameStage = _gameStage;
  });
</script>

<main>
  <h1>Jeopardy</h1>
  <button on:click={() => gameStageStore.set(GameStage.FILE)}>FILE</button>
  <button on:click={() => gameStageStore.set(GameStage.TEAMS)}>TEAMS</button>
  <button on:click={() => gameStageStore.set(GameStage.BOARD)}>BOARD</button>
  <button on:click={() => gameStageStore.set(GameStage.WINNER)}>WINNER</button>

  {#if gameStage === GameStage.FILE}
    <div>Upload file</div>
  {:else if gameStage === GameStage.TEAMS}
    <div>Create teams</div>
  {:else if gameStage === GameStage.BOARD}
    <div>Board</div>
  {:else if gameStage === GameStage.WINNER}
    <div>Winner</div>
  {:else}
    <h1>Unreachable</h1>
  {/if}
</main>

<style>
</style>
