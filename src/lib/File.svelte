<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import { game } from "../store/game";
  import { nav } from "../store/nav";
  import Glass from "./base/Glass.svelte";

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

<Glass>
  <input type="file" on:change={handleChange} accept=".json" class:error />
</Glass>

<style>
  input {
    font-family: "Tektur", sans-serif;
    appearance: none;
    font-size: 0.8rem;
  }

  input::file-selector-button {
    font-family: "Tektur", sans-serif;
    appearance: none;
    background-color: white;
    color: black;
    border: 1px solid black;
    padding: 8px;
    transform: translate(0%, 0%);
  }

  input::file-selector-button:hover {
    background-color: black;
    color: white;
  }

  input::file-selector-button:active {
    transform: translate(1%, 1%);
  }

  .error {
    color: red;
  }
</style>
