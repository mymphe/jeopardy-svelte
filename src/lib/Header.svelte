<script>
  import { Stage, stage } from "../store/stage";
  import { teams } from "../store/teams";
</script>

<header class="glass">
  {#each $teams as { name, score }}
    <div>
      <p>
        {#if $stage === Stage.TEAMS}
          <button type="button" on:click={() => teams.remove(name)}>-</button>
        {/if}
        {name}: {score}
      </p>
    </div>
  {:else}
    <div>Своя игра</div>
  {/each}
</header>

<style>
  header {
    padding: 1rem;
    height: 10vh;

    display: flex;
    justify-content: center;
  }
</style>
