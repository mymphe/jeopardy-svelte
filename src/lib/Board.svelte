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
      <div class="category">
        <h3 class="category-name">{name}</h3>
        <div
          class="category-clues"
          style="grid-template-columns: repeat({clues.length}, 1fr)"
        >
          {#each clues as { hidden, price, path }}
            <button
              class="clue-button"
              disabled={hidden}
              on:click={() => cursor.set(path)}>{price}</button
            >
          {/each}
        </div>
      </div>
    {:else}
      <p>No data</p>
    {/each}
  </BoardGlass>
{/if}

<style>
  .category {
    display: grid;
    grid-template-columns: 2fr 4fr;
    column-gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .category-name {
    text-align: left;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .category-clues {
    display: grid;
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
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
</style>
