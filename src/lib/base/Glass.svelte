<script>
  import { blur, fade, fly, scale, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div>
  <section
    transition:scale={{
      duration: 400,
      opacity: 0.5,
      easing: quintOut,
    }}
    class="glass standard-font"
  >
    <slot />
  </section>
</div>

<style>
  section {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);

    display: inline-block;
    padding: 2rem;
    text-align: center;
    overflow: hidden;

    background-color: white;
    border: 2px solid blue;
    box-shadow: 10px 10px blue;
  }
</style>
