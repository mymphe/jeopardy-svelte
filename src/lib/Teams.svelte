<script lang="ts">
  import { nav } from "../store/nav";
  import { teams } from "../store/teams";
  import Glass from "./base/Glass.svelte";

  const animals = [
    "🐒",
    "🦍",
    "🦧",
    "🐩",
    "🐺",
    "🦊",
    "🦝",
    "🐈",
    "🐈‍⬛",
    "🦁",
    "🐯",
    "🐴",
    "🫎",
    "🫏",
    "🦄",
    "🦓",
    "🦌",
    "🐮",
    "🐷",
    "🐗",
    "🐐",
    "🐪",
    "🦙",
    "🦒",
    "🐘",
    "🦣",
    "🦏",
    "🦛",
    "🐁",
    "🐀",
    "🐹",
    "🐰",
    "🐿️",
    "🦫",
    "🦔",
    "🦇",
    "🐻",
    "🐨",
    "🐼",
    "🦥",
    "🦦",
    "🦨",
    "🦘",
    "🦡",
    "🦃",
    "🐔",
    "🐓",
    "🐥",
    "🕊️",
    "🦅",
    "🦆",
    "🦢",
    "🦉",
    "🦩",
    "🦜",
    "🦚",
    "🐸",
    "🐊",
    "🐢",
    "🦎",
    "🐍",
    "🐲",
    "🦕",
    "🦖",
    "🐋",
    "🐬",
    "🦭",
    "🐡",
    "🦈",
    "🐙",
    "🪼",
    "🦀",
    "🦞",
    "🦐",
    "🦑",
    "🐌",
    "🦋",
    "🐛",
    "🐜",
    "🐝",
    "🐞",
    "🦗",
    "🪳",
    "🕷️",
    "🦂",
    "🦟",
    "🪰",
    "🪱",
  ];

  const traits = [
    "🔨",
    "🪓",
    "⛏️",
    "🗡️",
    "💣",
    "🪃",
    "🏹",
    "🛡️",
    "🪚",
    "🔧",
    "🪛",
    "🔩",
    "🎷",
    "🪗",
    "🎸",
    "🎹",
    "🎺",
    "🎻",
    "🪕",
    "🥁",
    "🪘",
    "🪇",
    "🪈",
    "🕶️",
    "🥽",
    "🥼",
    "🦺",
    "👔",
    "👕",
    "👖",
    "🧣",
    "🧤",
    "🧥",
    "🧦",
    "👗",
    "👘",
    "🩱",
    "🩲",
    "🩳",
    "👙",
    "👚",
    "🪭",
    "👛",
    "👜",
    "🎒",
    "🩴",
    "👟",
    "🥾",
    "🥿",
    "👠",
    "👡",
    "🩰",
    "👢",
    "🪮",
    "👑",
    "👒",
    "🎩",
  ];

  function random() {
    const trait = traits[Math.floor(Math.random() * traits.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return trait + animal;
  }

  let newTeamName = random();
  let addDisabled = true;
  const MAX_TEAMS = 20;

  $: {
    addDisabled =
      !newTeamName ||
      !!$teams.find((t) => t.name === newTeamName) ||
      $teams.length === MAX_TEAMS;
  }

  $: {
    nav.setNext($teams.length > 0);
  }

  function handleAdd() {
    teams.add(newTeamName);
    newTeamName = random();
  }
</script>

<img class="kto" src="kto.png" alt="вы кто такие" width="200px" />
<Glass title="Кто вы такие?">
  <div>
    <button
      class="refresh"
      type="button"
      on:click={() => {
        newTeamName = random();
      }}>✦</button
    >
    <p>{newTeamName}</p>
    <button
      disabled={addDisabled}
      type="button"
      on:click={handleAdd}
      class="add">✔</button
    >
  </div>
</Glass>

<style>
  .kto {
    position: absolute;
    top: 8vh;
    left: 30vw;
    z-index: 1;
    -webkit-filter: drop-shadow(10px 10px 0 blue) drop-shadow(-4px -4px 0 blue);
    filter: drop-shadow(8px 8px 0 blue) drop-shadow(-4px -4px 0 blue);
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-size: 3rem;
    width: 4ch;
    margin: 1rem 2rem;
  }

  button {
    appearance: none;
    font-size: 1rem;
    line-height: 1rem;
    background-color: white;
    border: 2px solid black;
    color: black;
    padding: 0.2rem 0.5rem;
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

  .refresh {
    color: rgb(143, 0, 226);
  }

  .add {
    color: rgb(0, 175, 0);
  }
</style>
