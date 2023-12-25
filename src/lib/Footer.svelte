<script>
  import { Stage, stage } from "../store/stage";
  import { nav } from "../store/nav";

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

<footer>
  <button disabled={!$nav.back} on:click={stage.back}>←</button>
  <span>&nbsp;</span>
  <button disabled={!$nav.next} on:click={stage.next}>→</button>
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
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
