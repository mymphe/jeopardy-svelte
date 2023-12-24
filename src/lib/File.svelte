<script lang="ts">
  import { game } from "../store/game";
  import { nav } from "../store/nav";

  let json: string = "";
  let error: string = "Данные отсутствуют";

  $: {
    try {
      error = "";
      game.set(game.transform(json));
    } catch {
      error = json ? "Неверный формат данных" : "Данные отсутствуют";
    }
  }

  $: {
    nav.setNext(!error);
  }
</script>

<p>{error}</p>
<textarea placeholder="Вставьте вопросы в формате JSON" bind:value={json} />

<style>
</style>
