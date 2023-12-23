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
  <p id="json-error">{error}</p>
  <textarea
    id="json"
    class={error ? "error" : "no-error"}
    placeholder="Вставьте вопросы в формате JSON"
    bind:value={json}
    on:input={validate}
  />
  <button disabled={!!error} type="submit">Далее</button>
</form>

<style>
  #json {
    width: 50%;
    min-width: 30%;
    max-width: 70%;
    height: calc(100vh * 0.8);
    min-height: calc(100vh * 0.3);
    max-height: calc(100vh * 0.6);
    border-radius: 0.5rem;
  }

  .error {
    outline: 1px solid red;
  }

  .no-error {
    outline: none;
  }

  #json-error {
    color: rgb(245, 23, 23);
  }
</style>
