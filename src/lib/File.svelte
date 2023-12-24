<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import { game } from "../store/game";
  import { nav } from "../store/nav";

  let error: boolean = true;

  $: {
    nav.setNext(!error);
  }

  const handleChange: FormEventHandler<HTMLInputElement> = async (event) => {
    try {
      error = false;

      const target = event.target as HTMLInputElement;
      const [file] = target.files!;

      const json = await parseJson(file);
      game.set(game.transform(json));
    } catch (e) {
      error = true;
    }
  };

  async function parseJson(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
</script>

<input type="file" on:change={handleChange} accept=".json" class:error />

<style>
  input {
    display: inline-block;
    width: min-content;
    font-size: 1rem;
  }

  .error {
    color: red;
  }
</style>
