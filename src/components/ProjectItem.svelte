<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="flex flex-col items-center">
    <hr class="border-2 border-blue-500 border-opacity-40 rounded-full mx-20 w-11/12 lg:w-5/6 justify-center"/>
    <div class="flex flex-row p-4 sm:p-6 md:p-8 lg:items-center lg:justify-between flex-wrap justify-center lg:flex-nowrap min-w-0">
        {@render children?.()}
    </div>
</div>