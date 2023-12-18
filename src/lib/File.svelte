<script lang="ts">
  import { game } from "../store/game";
  import { stage } from "../store/stage";

  let json: string = "";
  let error: string = "Данные отсутствуют";

  function validate() {
    try {
      error = "";
      JSON.parse(json);
    } catch {
      error = "Неверный формат данных";
    }
  }

  function submit() {
    game.set(game.transform(json));
    stage.teams();
  }
</script>

<form on:submit|preventDefault={submit}>
  <textarea
    placeholder="Вставьте вопросы в формате JSON"
    bind:value={json}
    on:input={validate}
  />
  <p>{error}</p>
  <button disabled={!!error} type="submit">Далее</button>
</form>
