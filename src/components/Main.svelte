<script>
    import Step from "./Step.svelte";


    let steps = [
        {name: 'This Website', icon: 'fa-solid fa-globe'},
        {name: 'Websocket Auction', icon: 'fa-solid fa-network-wired'},
        {name: 'Custom Wordle', icon: 'fa-solid fa-puzzle-piece', href: "game"},
    ]
</script>

<main class="flex flex-col flex-1 p-4">
    <section id="startPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
        <div class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10">
            <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Hi! I'm <span class="poppins text-blue-500">Dean</span>
            </h2>
            <p class="text-base sm:text-lg md:text-xl">
                I am a student at <span class="text-purple-700">Kansas State University</span>. Here you can read about some of the things that I'm doing!
            </p>
            <a href="#" target="_blank" class="customShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 cursor-pointer">
                <h4 class="relative z-9">Contact me &rarr;</h4>
            </a>
        </div>
        <div class="relative shadow-2xl grid place-items-center">
            <!-- <img src={"images/image.png"} alt="Image" class="object-cover z-[2] max-h-[70vh]"/> -->
        </div>
    </section>


    <section id="projects" class="py20 lg:py-32 flex flex-col gap-24">
        <div class="flex flex-col gap-2 text-center">
            <h6 class="text-lg sm:text-xl md:text-2xl">
                <!--header-->
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-4xl">
                Here's a snapshot of some of my favorite projects
            </h3>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            <Step step={steps[0]}>
                <!--Anything here rendered in the slot in Step.svelte-->
                <p>
                    This website was made with <strong class="text-blue-500"> Svelte/SvelteKit, Tailwind, Particlesjs, & FontAwesome</strong>
                    . I try to keep this site as up to date as possible. Click the link to see a full breakdown.
                </p>
            </Step>
            <Step step={steps[1]}>
                <p>
                    Websocket Auction was a team project for a software architecture class at K-State. It used <strong class="text-blue-500"> C# and the Websocket-Sharp library</strong>
                    to communicate between an auctioneer server and multiple clients who could bid on different items. See a demo video using the link.
                </p>
            </Step>
            <Step step={steps[2]}>
                Custom Wordle is my version of wordle where you can input a word of any length/validity and create a link that you can send to a friend. You can play it by clicking the link below.
            </Step>
        </div>
        <a href="projects" class="mx-auto px-4 py-2 rounded-md border border-solid border-white flex items-center gap-2 -mb-0 sm:-mb-0 -mt-10
        hover:border-blue-700 duration-200">
            <p>See all of my projects here</p>
            <i class="fa-solid fa-link"/>
        </a>
    </section>

    <section id="about" class="py-20 pt-10 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative">

    </section>
</main>