<script lang="ts">
  import Board from "./lib/Board.svelte";
  import File from "./lib/File.svelte";
  import Teams from "./lib/Teams.svelte";
  import Winner from "./lib/Winner.svelte";
  import { nav } from "./store/nav";
  import { Stage, stage } from "./store/stage";
  import { teams } from "./store/teams";

  $: {
    if ($stage === Stage.FILE) {
      nav.setBack(false);
    } else if ($stage === Stage.WINNER) {
      nav.setNext(false);
    } else {
      nav.setBack(true);
      nav.setNext(true);
    }
  }
</script>

<main>
  <header>
    <h1>Викторина Гэнговна</h1>
    <div>
      {#each $teams as { name, score }}
        <div>
          <p>
            {#if $stage === Stage.TEAMS}
              <button type="button" on:click={() => teams.remove(name)}
                >-</button
              >
            {/if}
            {name}: {score}
          </p>
        </div>
      {/each}
    </div>
  </header>
  <section>
    {#if $stage === Stage.FILE}
      <File />
    {:else if $stage === Stage.TEAMS}
      <Teams />
    {:else if $stage === Stage.BOARD}
      <Board />
    {:else if $stage === Stage.WINNER}
      <Winner />
    {:else}
      <p>Unreachable</p>
    {/if}
  </section>
  <footer>
    <button disabled={!$nav.back} on:click={stage.back}>Назад</button>
    <button disabled={!$nav.next} on:click={stage.next}>Далее</button>
  </footer>
</main>

<style>
  main {
    width: 100vw;
    min-width: 375px;
    height: 100vh;

    text-align: center;
    padding: 0 10rem;

    background-image: url("bg.jpg");
    background-size: 100vw 100vh;
    color: rgb(21, 21, 21);
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
  }

  @media (max-width: 720px) {
    main {
      padding: 0 2rem;
    }
  }

  header {
    height: 10vh;
  }

  header h1 {
    font-family: Gabriela, serif;
    font-size: 3em;
  }

  section {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.2px);
    -webkit-backdrop-filter: blur(9.2px);

    display: inline-block;
    padding: 2rem;
    text-align: center;
    overflow: hidden;
  }

  footer {
    height: 2vh;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
</style>
