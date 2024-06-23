<script>
import "../app.css";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";

    let y;
    let innerHeight = 0;
    let innerWidth = 0;

    function scrollToTop() {
        document.body.scrollIntoView()
    }
</script>

<div class="relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen">
    <!-- ? denotes if statement where left of colon is true and right of colon is false, left of ? is conditional statement-->
    <div class={"fixed bottom-0 w-full duration-200 flex p-10 z-[10] " + y > 0 ? ' opactiy-full pointer-events-auto' : ' pointer-events-none opacity-0'}>
        <button on:click={scrollToTop} class="ml-auto rounded-full bg-slate-900 text-blue-500 px-3 sm:px-4 hover:bg-slate-800 curosr-pointer">
            <i class="fa-solid fa-arrow-up"/>
        </button>
    </div>
    <!-- Inserts Header element onto the page -->
    <Header y={y}/>
    <slot />
    <!-- Inserts the footer element onto the page -->
    <Footer/>


</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth/>
