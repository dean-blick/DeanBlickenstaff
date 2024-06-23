<script>
    export let y;

    let tabs = [
        { name: 'About me', link: '#About'},
        { name: 'Projects', link: '#Projects'},
        { name: 'Experience', link: '#Experience'},
        { name: 'Transcript', link: '#Transcript'}
    ];

</script>

<header class={'sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border border-solid ' + (y > 0 ? 'py-4 bg-slate-950 border-blue-950' : 'py-6 bg-transparent border-transparent')}>
    <h1>
        <b class="font-bold poppins">Dean</b> Blickenstaff
    </h1>
    <div class="sm:flex items-center gap-4 hidden">
        {#each tabs as tab, index}
            <a href={tab.link} class="duration-200 hover:text-blue-500">
                <p>{tab.name}</p>
            </a>
        {/each}
    </div>
    <a href="#" target="_blank" class="customShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500">
        <h4 class="relative z-9">Contact me</h4>
    </a>
</header>