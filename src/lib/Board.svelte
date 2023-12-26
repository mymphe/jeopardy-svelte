<script lang="ts">
  import { active, categories, cursor } from "../store/board";
  import Clue from "./Clue.svelte";
  import BoardGlass from "./base/BoardGlass.svelte";
</script>

{#if $active}
  <Clue clue={$active} />
{:else}
  <BoardGlass>
    {#each $categories as { name, clues }}
      <h3>{name}</h3>
      {#each clues as { hidden, price, path }}
        <button
          class="clue-button"
          disabled={hidden}
          on:click={() => cursor.set(path)}>{price}</button
        >
      {/each}
    {:else}
      <p>No data</p>
    {/each}
  </BoardGlass>
{/if}

<style>
  h3 {
    margin-top: 0.5rem;
  }

  button {
    appearance: none;
    font-size: 20px;
    background-color: white;
    border: 2px solid black;
    color: black;
    padding: 0.5rem 1rem;
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

  .clue-button {
    margin-right: 6px;
    font-size: 0.8rem;
  }
</style>
