<script>
    import "../app.css";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import ViewTransition from "./navigation.svelte";

    let y;
    let innerHeight = 0;
    let innerWidth = 0;

    function scrollToTop() {
        document.body.scrollIntoView()
    }
</script>

<div class="relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen">
    <!-- ? denotes if statement where left of colon is true and right of colon is false, left of ? is conditional statement-->
    <div class={"fixed bottom-0 w-full duration-200 flex p-10 z-[10] " + y > 0 ? ' opacity-full pointer-events-auto' : ' pointer-events-none opacity-0'}>
        <button on:click={scrollToTop} class="ml-auto rounded-full bg-slate-900 text-blue-500 px-3 sm:px-4 hover:bg-slate-800 curosr-pointer">
            <i class="fa-solid fa-arrow-up"/>
        </button>
    </div>
        <ViewTransition/>
        <!-- Inserts Header element onto the page -->
        <Header y={y}/>
    <div class="flex flex-col min-h-[calc(75vh)]">
        <!--Slots in the active route-->
        <slot />
    </div>
    <div class="flex flex-1 min-h-[calc(15vh)]"/>
</div>
<!-- Inserts the footer element onto the page -->
<Footer/>
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth/>
