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
</style>
