<script lang="ts">
    let { y } = $props();

    let tabs = [
        { name: 'Projects', link: 'projects'},
        { name: 'Web-Projects', link: 'webProjects'},
        //{ name: 'Transcript', link: 'transcript'}
    ];

</script>

<header class={'sticky z-[10] max-w-[1400px] lg:left-60 top-0 duration-200 px-6 flex items-center justify-between border border-solid ' + (y > 0 ? 'py-4 bg-slate-950 border-blue-950' : 'py-6 bg-transparent border-transparent')}>
    <a href="/">
        <b class="font-bold poppins">Dean</b> Blickenstaff
    </a>
    <div class="sm:flex ml-auto pr-4 items-center gap-4 hidden">
        {#each tabs as tab, index}
            <a href={tab.link} class="duration-200 hover:text-blue-500">
                <p>{tab.name}</p>
            </a>
        {/each}
    </div>
    <a href="https://www.linkedin.com/in/deanblickenstaff/" target="_blank" class="customShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500">
        <h4 class="relative z-9">LinkedIn</h4>
    </a>
</header>

<style>
    header {
        view-transition-name: header;
    }
</style>