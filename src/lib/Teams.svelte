<script lang="ts">
  import { nav } from "../store/nav";
  import { stage } from "../store/stage";
  import { teams } from "../store/teams";

  let newTeamName = "";

  let addDisabled = true;

  $: {
    addDisabled = !newTeamName || !!$teams.find((t) => t.name === newTeamName);
  }

  $: {
    nav.setNext($teams.length > 0);
  }

  function handleAdd() {
    teams.add(newTeamName);
    newTeamName = "";
  }
</script>

<input bind:value={newTeamName} placeholder="Hазвание команды" />
<button disabled={addDisabled} type="button" on:click={handleAdd}>+</button>
