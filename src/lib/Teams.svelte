<script lang="ts">
  import { nav } from "../store/nav";
  import { teams } from "../store/teams";
  import Glass from "./base/Glass.svelte";

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

<Glass>
  <input bind:value={newTeamName} placeholder="Hазвание команды" />
  <button disabled={addDisabled} type="button" on:click={handleAdd}>+</button>
</Glass>
