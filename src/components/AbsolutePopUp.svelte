<script lang="ts">
    import { allowGlobalOverlay } from "../stores/OverlayStore";
    let { buttonText, overlayHeader, children } = $props();
    let thisOverlay = $state(false);
    function openOverlay() {
        allowGlobalOverlay.set(false);
        thisOverlay = true;
    }
    function closeOverlay() {
        thisOverlay = false;
        allowGlobalOverlay.set(true);
    }
</script>

<button class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center"
onclick={() => openOverlay()}>
    {buttonText}
</button>
{#if thisOverlay}
    <div class="w-screen h-screen top-0 left-72 flex justify-center items-center absolute z-50">
        <div class="bg-gray-900 text-white rounded-md px-8 py-10 relative max-w-lg opacity-90">
            <h>{overlayHeader}</h>
            {@render children?.()}
            <button class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center"
            onclick={() => closeOverlay()}>
                Close
        </div>
    </div>  
{/if}
