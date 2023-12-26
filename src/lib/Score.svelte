<script>
  import { derived } from "svelte/store";
  import { Stage, stage } from "../store/stage";
  import { teams } from "../store/teams";

  const odd = derived([teams], ([teams]) =>
    teams.filter((_, i) => i % 2 === 0)
  );

  const even = derived([teams], ([teams]) =>
    teams.filter((_, i) => i % 2 === 1)
  );
</script>

<div class="score left">
  {#each $odd as { name, score }}
    <div>
      <p class="item">
        <span class="name">
          {name}
        </span>
        <span>&nbsp;</span>
        {#if $stage === Stage.TEAMS}
          <button type="button" on:click={() => teams.remove(name)}>✕</button>
        {:else}
          <span class="numbers">
            {score}
          </span>
        {/if}
      </p>
    </div>
  {/each}
</div>
<div class="score right">
  {#each $even as { name, score }}
    <div>
      <p class="item">
        {#if $stage === Stage.TEAMS}
          <button type="button" on:click={() => teams.remove(name)}>✕</button>
        {:else}
          <span class="numbers">
            {score}
          </span>
        {/if}
        <span>&nbsp;</span>
        <span class="name">
          {name}
        </span>
      </p>
    </div>
  {/each}
</div>

<style>
  .score {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left {
    left: 1rem;
    align-items: start;
  }

  .right {
    right: 1rem;
    align-items: end;
  }

  .name {
    font-size: 2rem;
  }

  .numbers {
    font-size: 2rem;
  }

  .item {
    display: flex;
    align-items: center;
  }

  button {
    appearance: none;
    font-size: 1rem;
    color: red !important;
    border-radius: 50%;
    color: black;
    padding: 0.2rem 0.5rem;
    font-family: "Tektur", sans-serif;
  }

  button:disabled {
    opacity: 0.3;
  }

  button:active:enabled {
    transform: translate(2px, 2px);
  }
</style>
