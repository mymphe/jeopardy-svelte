<script lang="ts">
  import { active, categories, cursor, round } from "../store/board";
  import { game } from "../store/game";
  import { nav } from "../store/nav";
  import { teams } from "../store/teams";
  import BoardGlass from "./base/BoardGlass.svelte";
  import Glass from "./base/Glass.svelte";

  enum ClueType {
    text,
    image,
    audio,
    video,
  }

  let clueType = ClueType.text;

  active.subscribe((clue) => {
    if (clue) {
      if (clue.clue.startsWith("audio")) {
        clueType = ClueType.audio;
      } else if (clue.clue.startsWith("image")) {
        clueType = ClueType.image;
      } else if (clue.clue.startsWith("video")) {
        clueType = ClueType.video;
      } else {
        clueType = ClueType.text;
      }
    }
  });
</script>

{#if $active}
  <Glass>
    <h2>{$active.price}</h2>
    {#if clueType === ClueType.image}
      <img src={$active.clue.slice(6)} alt="clue" width="500" />
    {:else if clueType === ClueType.audio}
      <audio controls>
        <source src={$active.clue.slice(6)} type="audio/ogg" />
        <source src={$active.clue.slice(6)} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    {:else if clueType === ClueType.video}
      <iframe
        width="560"
        height="315"
        src={$active.clue.slice(6).replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    {:else}
      <p>{$active.clue}</p>
    {/if}
    <hr />
    <div>
      {#each $teams as { name }}
        <div>
          <p>{name}</p>
          <button
            disabled={$active.wrong.includes(name) || !!$active.correct}
            type="button"
            on:click={() => {
              if ($active) {
                game.answer(name, true, $active.path);
              }
            }}>👍</button
          >
          <button
            disabled={!!$active.correct || $active.wrong.includes(name)}
            type="button"
            on:click={() => {
              if ($active) {
                game.answer(name, false, $active.path);
              }
            }}>👎</button
          >
        </div>
      {/each}
    </div>
    <hr />
    <button
      on:click={() => {
        if ($cursor) {
          game.hideClue($cursor);
          cursor.set(null);
        }
      }}
      type="button">Закрыть</button
    >
  </Glass>
{:else}
  <BoardGlass>
    {#each $categories as { name, clues }}
      <p>{name}</p>
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
  }
</style>
