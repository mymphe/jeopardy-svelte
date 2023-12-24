<script lang="ts">
  import { derived } from "svelte/store";
  import { teams } from "../store/teams";
  import { stage } from "../store/stage";
  import { game } from "../store/game";
  import { cursor, round } from "../store/board";

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

<h2>Yahoo {$winner.name}</h2>
<button type="button" on:click={resetGame}>Начать заново</button>
