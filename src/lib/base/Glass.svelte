<script lang="ts">
  export let title: string = "";
  export let padding: boolean = true;
</script>

<div>
  <section>
    {#if title}
      <p>{title}</p>
    {/if}
    <div id="content" class:padding>
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
    overflow: hidden;
    padding: 0 0 16px;
  }

  .padding {
    padding: 8px 24px 16px;
  }

  section {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);

    max-width: 70vw;
    display: inline-block;
    text-align: center;
    overflow: hidden;

    background-color: white;
    border: 2px solid blue;
    box-shadow: 10px 10px blue;
  }
</style>
