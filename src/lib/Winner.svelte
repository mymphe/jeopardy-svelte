<script lang="ts">
  import { derived } from "svelte/store";
  import { teams } from "../store/teams";
  import { stage } from "../store/stage";
  import { game } from "../store/game";
  import { cursor, round } from "../store/board";
  import Glass from "./base/Glass.svelte";

  const winner = derived([teams], ([_teams]) => {
    if (!_teams.length)
      return {
        name: "None",
        score: 0,
      };

    let winner = _teams[0];

    for (const team of _teams) {
      if (team.score > winner.score) {
        winner = team;
      }
    }

    return winner;
  });

  const resetGame = () => {
    teams.reset();
    stage.reset();
    game.reset();
    round.reset();
    cursor.reset();
  };
</script>

<Glass title="🎉 Победитель! 🎉">
  <p class="winner-name">{$winner.name}</p>
  <button type="button" on:click={resetGame}>Начать заново?</button>
</Glass>

<style>
  .winner-name {
    font-size: 5rem;
  }

  button {
    appearance: none;
    font-size: 1rem;
    background-color: white;
    border: 2px solid black;
    color: black;
    padding: 0.2rem 2rem;
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
</style>
