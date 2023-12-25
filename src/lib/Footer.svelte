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
  <button disabled={!$nav.back} on:click={stage.back}>&LessLess;</button>
  <span>&nbsp;</span>
  <button disabled={!$nav.next} on:click={stage.next}>&GreaterGreater;</button>
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
    background-color: black;
    color: white;
  }

  button:active:enabled {
    transform: translate(1%, 1%);
  }
</style>
