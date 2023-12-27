<script lang="ts">
  import { round } from "../../store/board";
  import { game } from "../../store/game";
  import { nav } from "../../store/nav";

  const rounds = $game.length;

  $: {
    const lastRound = $round + 1 === rounds;
    if (lastRound) {
      nav.setNext(true);
    } else {
      nav.setNext(false);
    }
  }
</script>

<div class="board">
  <div class="heading">
    <button
      disabled={$round === 0}
      type="button"
      on:click={() => round.update((r) => --r)}>←</button
    >
    <span>Раунд {$round + 1} / {rounds}</span>
    <button
      disabled={$round + 1 >= rounds}
      type="button"
      on:click={() => round.update((r) => ++r)}>→</button
    >
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .heading {
    border-bottom: 2px solid blue;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    padding: 1rem;
  }

  .board {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);

    width: 65vw;
    max-height: 70vh;
    text-align: center;
    overflow-x: hidden;

    background-color: white;
    border: 2px solid blue;
    box-shadow: 10px 10px blue;
  }

  button {
    appearance: none;
    font-size: 1rem;
    background-color: white;
    border: 2px solid black;
    color: black;
    padding: 2px 8px;
    font-family: "Tektur", sans-serif;
  }

  button:disabled {
    opacity: 0.3;
  }

  button:hover:enabled {
    box-shadow: 4px 4px black;
  }

  button:active:enabled {
    box-shadow: 2px 2px black;
    transform: translate(2px, 2px);
  }
</style>
