<script>
    import ProjectItem from "./ProjectItem.svelte";
    import umlImg from "../lib/Bid501-ClassDiagrams.webp";
    import ToDo from "./ToDo.svelte";
</script>
<div class="flex flex-col">
    <hr class="border-2 border-blue-700 duration-200 border-opacity-40 rounded-full mx-20 mt-10 w-5/6"/>
    <ProjectItem>
        <div class="flex flex-col w-1/2">
            <h class="py-4 font-semibold text-lg">Websocket Auction</h>
            <p class="py-4">&emsp;This was a group project for CIS 501 at Kansas State University. A websocket was used to coordinate the bidding and sale of different items through a client and server interface.<p/> 
            <p class="py-4">&emsp;I was responsible for the client side code & UML. See the UML (open in new tab) and demo video to the right. Still working on my presentation skills.</p>
        </div>
        <img class="w-1/4 m-10" alt="uml diagram" src={umlImg} />
        <iframe class="self-end" width="560" height="315" src="https://www.youtube.com/embed/ohi5Bj-2WnQ?si=A3zEdDdH-lbVKK57" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2">
            <h class="py-4 font-semibold text-lg">This Website</h>
            <p class="py-4">&emsp;I have quite the laundry list of things I would like to accomplish while working on this website.</p>
            <a href="https://github.com/dean-blick/Website" target="_blank" class="customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                <h4 class="relative z-9">See this website on GitHub</h4>
            </a>
        </div>
        <ToDo/>
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2">
            <h class="py-4 font-semibold text-lg">Title</h>
            <p class="py-4">&emsp;Description</p>
        </div>
        <img class="w-1/4 m-10" alt="uml diagram" src={umlImg} />
        cis 400 project
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2">
            <h class="py-4 font-semibold text-lg">Title</h>
            <p class="py-4">&emsp;Description</p>
        </div>
        <img class="w-1/4 m-10" alt="uml diagram" src={umlImg} />
        scantron program
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2">
            <h class="py-4 font-semibold text-lg">Title</h>
            <p class="py-4">&emsp;Description</p>
        </div>
        <img class="w-1/4 m-10" alt="uml diagram" src={umlImg} />
        booth creek programs
    </ProjectItem>
</div> 