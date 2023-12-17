<script lang="ts">
  import { gameDataStore, type GameData } from "../store/game-data";
  import { GameStage, gameStageStore } from "../store/game-stage";

  let jsonContent: string = "";

  let error: string = "Данные отсутствуют";

  function validate() {
    try {
      error = "";
      JSON.parse(jsonContent);
    } catch {
      error = "Неверный формат данных";
    }
  }

  function transfrom(jsonContent: string) {
    const data: any = JSON.parse(jsonContent);

    for (const round of data) {
      for (const category of round) {
        for (const [price, clue] of Object.entries(category.clues)) {
          category.clues[price] = {
            clue,
            disabled: false,
          };
        }
      }
    }

    return data;
  }

  function submit() {
    const gameData: GameData = transfrom(jsonContent);
    gameDataStore.set(gameData);

    gameStageStore.set(GameStage.TEAMS);
  }
</script>

<form on:submit|preventDefault={submit}>
  <textarea
    placeholder="Вставьте вопросы в формате JSON"
    bind:value={jsonContent}
    on:input={validate}
  />
  <p>{error}</p>
  {#if !error}
    <button type="submit">Далее</button>
  {/if}
</form>
