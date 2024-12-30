<script lang="ts">
    interface Props {
        character?: string;
        activeTile?: boolean;
        tileStatus?: number;
    }

    let { character = '', activeTile = false, tileStatus = 0 }: Props = $props();
</script>
<div class:border-gray-400 = "{activeTile}" class:bg-lime-900 = "{tileStatus == 3}" class:bg-yellow-400 = "{tileStatus == 2}" class:bg-gray-700 = "{tileStatus == 1}" class:bg-transparent = "{tileStatus == 0}" class=" border-gray-600 border-2 w-14 h-14 m-1 py-2.5 text-white capitalize">
    <div class="bg-transparent h-full justify-center text-center w-full">{character}</div>
</div>