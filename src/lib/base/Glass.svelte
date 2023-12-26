<script lang="ts">
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let title: string = "";
</script>

<div>
  <section
    transition:scale={{
      duration: 400,
      opacity: 0.5,
      easing: quintOut,
    }}
  >
    {#if title}
      <p>{title}</p>
    {/if}
    <div id="content">
      <slot />
    </div>
  </section>
</div>

<style>
  p {
    border-bottom: 2px solid blue;
    padding: 8px 24px;
  }

  #content {
    padding: 8px 24px 16px;
  }

  section {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    display: inline-block;
    text-align: center;
    overflow: hidden;

    background-color: white;
    border: 2px solid blue;
    box-shadow: 10px 10px blue;
  }
</style>
