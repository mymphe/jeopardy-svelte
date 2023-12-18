<script lang="ts">
  import { get } from "svelte/store";
  import { teamStore, type Team } from "../store/teams";
  import { stage } from "../store/stage";

  let newTeamName = "";
  let teams: Team[] = get(teamStore);

  teamStore.subscribe((_teams) => {
    teams = _teams;
  });

  function addTeam() {
    teamStore.update((teams) => {
      teams.push({
        name: newTeamName,
        score: 0,
        finalRound: {
          guess: "",
          stake: 0,
        },
      });
      return teams;
    });

    newTeamName = "";
  }

  function removeTeam(teamName: string) {
    teamStore.update((teams) => {
      const filtered = teams.filter((t) => t.name !== teamName);
      return filtered;
    });
  }

  function submit() {
    stage.board();
  }
</script>

<form on:submit|preventDefault={submit}>
  <input bind:value={newTeamName} />
  {#if newTeamName && !teams.map((t) => t.name).includes(newTeamName)}
    <button type="button" on:click={() => addTeam()}>+</button>
  {/if}
  {#each teams as team}
    <div>
      <span>{team.name}</span>
      <button type="button" on:click={() => removeTeam(team.name)}>-</button>
    </div>
  {/each}
  {#if teams.length}
    <button type="submit">Далее</button>
  {/if}
</form>
