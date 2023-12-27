<script lang="ts">
  import { active, cursor } from "../store/board";
  import { game, type Clue } from "../store/game";
  import { teams } from "../store/teams";
  import Glass from "./base/Glass.svelte";

  export let clue: Clue;

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

<Glass
  title={String(clue.price)}
  unpadded={clueType === ClueType.image || clueType === ClueType.video}
>
  {#if clueType === ClueType.image}
    <img src={clue.clue.slice(6)} alt="clue" />
  {:else if clueType === ClueType.audio}
    <audio controls>
      <source src={clue.clue.slice(6)} type="audio/ogg" />
      <source src={clue.clue.slice(6)} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  {:else if clueType === ClueType.video}
    <iframe
      width="560"
      height="315"
      src={clue.clue.slice(6).replace("watch?v=", "embed/")}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  {:else}
    <p>{clue.clue}</p>
  {/if}
  <div>
    <button
      on:click={() => {
        if ($cursor) {
          game.hideClue($cursor);
          cursor.set(null);
        }
      }}
      type="button">Закрыть</button
    >
  </div>
</Glass>

<style>
  button {
    appearance: none;
    font-size: 0.6rem;
    background-color: white;
    border: 2px solid black;
    color: black;
    padding: 0.2rem 2rem;
    font-family: "Tektur", sans-serif;
    margin-top: 1rem;
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

  img {
    max-height: 60vh;
    max-width: 70vw;
  }
</style>
