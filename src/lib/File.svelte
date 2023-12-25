<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import { game } from "../store/game";
  import { nav } from "../store/nav";
  import Glass from "./base/Glass.svelte";

  let filename: string = "";
  let error: boolean = true;

  let text: string = "🤷‍♀️";

  $: {
    if (filename) {
      if (error) {
        text = `🙅‍♀️ ${filename} 🙅‍♀️`;
      } else {
        text = `💁‍♀️ ${filename} 💁‍♀️`;
      }
    } else {
      text = "🤷‍♀️";
    }
  }

  $: {
    nav.setNext(!error);
  }

  const handleChange: FormEventHandler<HTMLInputElement> = async (event) => {
    try {
      error = false;
      filename = "";

      const target = event.target as HTMLInputElement;
      const [file] = target.files!;
      filename = file.name;

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

<Glass title="загрузите файл">
  <button>
    <label for="json">💾</label>
  </button>
  <input id="json" type="file" on:change={handleChange} accept=".json" />
  <p class:error>
    {text}
  </p>
</Glass>

<style>
  label {
    cursor: pointer;
    font-size: 3rem;
  }

  button:active {
    transform: translate(2px, 2px);
  }

  input {
    display: none;
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
