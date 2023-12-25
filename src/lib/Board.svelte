<script lang="ts">
  import { active, categories, cursor, round } from "../store/board";
  import { game } from "../store/game";
  import { nav } from "../store/nav";
  import { teams } from "../store/teams";
  import Glass from "./base/Glass.svelte";

  const rounds = $game.length;

  $: {
    const lastRound = $round + 1 === rounds;
    if (lastRound) {
      nav.setNext(true);
    } else {
      nav.setNext(false);
    }
  }

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
  <Glass>
    {#each $categories as { name, clues }}
      <p>{name}</p>
      {#each clues as { hidden, price, path }}
        <button disabled={hidden} on:click={() => cursor.set(path)}
          >{price}</button
        >
      {/each}
    {:else}
      <p>No data</p>
    {/each}
    <hr />
    <div>
      <button
        disabled={$round === 0}
        type="button"
        on:click={() => round.update((r) => --r)}>👈</button
      >
      <span>{$round + 1} / {rounds}</span>
      <button
        disabled={$round + 1 >= rounds}
        type="button"
        on:click={() => round.update((r) => ++r)}>👉</button
      >
    </div>
  </Glass>
{/if}

<style>
</style>
