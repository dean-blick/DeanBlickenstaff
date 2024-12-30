<script lang="ts">
    import { fly } from 'svelte/transition';
    
  interface Props {
    //export let show = false;
    id?: any;
    sidebarContent?: any;
  }

  let { id = -1, sidebarContent = -1 }: Props = $props();
</script>

<style>
    .fadedBorder {
        width: 10px;
        height: 100%;
        background: linear-gradient(to right, rgb(50,50,50), rgb(34,34,34));
    }
</style>

{#if sidebarContent===id}
  <nav class="bg-gray-700 w-50 h-screen fixed left-16 top-0 z-0" transition:fly={{x: -350, opacity: 0}}>
    <div class="flex flex-row w-full h-full">
      <div class="h-full w-full pt-3 px-2 text-white">
        {#if sidebarContent === 0}
          This Wordle clone is a project by Dean Blickenstaff in an effort to learn Svelte and Sveltekit. This project uses: Components,
          each loops, layouts, dynamic urls, and dynamic content.
        {:else if sidebarContent === 1}
          This version of Wordle, called "Schmordle", has some special rules and features. The word list is significantly harder than
          the typical version of Wordle. This version also allows any combination of letters as opposed to requiring a valid word guess, which may make the game easier.
          <br><br> There is also a feature that allows you to implement your own word and get a link that you can copy and send to a friend.
        {:else if sidebarContent === 2}
        Main wordle with random words - 100% <br><br>
        Ability to type any combination of characters - 100% <br><br>
        Create your own word with link - 100% <br><br>
        Sidebar with information - 100% <br><br>
        Words of different lengths - 100% <br><br>
        Statistics like average solve time, best solve time, worst solve time, number of guesses for each game - 0% <br><br>
        Cookies - 0%
        {:else if sidebarContent ===3}
        Stats
        {/if}
      </div>
      <div class="fadedBorder"></div>
    </div>
  </nav>
{/if}