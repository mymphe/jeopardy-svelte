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

<Glass>
  <h2>{clue.price}</h2>
  {#if clueType === ClueType.image}
    <img src={clue.clue.slice(6)} alt="clue" width="500" />
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
  <hr />
  <div>
    {#each $teams as { name }}
      <div>
        <p>{name}</p>
        <button
          disabled={clue.wrong.includes(name) || !!clue.correct}
          type="button"
          on:click={() => {
            if ($active) {
              game.answer(name, true, $active.path);
            }
          }}>👍</button
        >
        <button
          disabled={!!clue.correct || clue.wrong.includes(name)}
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
