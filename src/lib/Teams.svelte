<script lang="ts">
  import { stage } from "../store/stage";
  import { teams } from "../store/teams";

  let newTeamName = "";

  let addDisabled = true;

  $: {
    addDisabled = !newTeamName || !!$teams.find((t) => t.name === newTeamName);
  }
</script>

<form on:submit|preventDefault={stage.board}>
  <input bind:value={newTeamName} />
  <button
    disabled={addDisabled}
    type="button"
    on:click={() => {
      teams.add(newTeamName);
      newTeamName = "";
    }}>+</button
  >
  {#each $teams as { name }}
    <div>
      <span>{name}</span>
      <button type="button" on:click={() => teams.remove(name)}>-</button>
    </div>
  {:else}
    <p>No teams</p>
  {/each}
  <button disabled={$teams.length === 0} type="submit">Далее</button>
</form>
