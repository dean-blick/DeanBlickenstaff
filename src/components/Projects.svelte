<script>
    import ProjectItem from "./ProjectItem.svelte";
    import umlImg from "../lib/Bid501-ClassDiagrams.webp";
    import MyList from "./MyList.svelte";
</script>
<div class="flex flex-col backdrop-blur-xs rounded-lg bg-black/20">
    <ProjectItem>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80">
            <h class="py-4 font-semibold text-lg">Websocket Auction</h>
            <p class="py-4">&emsp;This was a group project for CIS 501 at Kansas State University. A websocket was used to coordinate the bidding and sale of different items through a client and server interface.<p/> 
            <p class="py-4">&emsp;I was responsible for the client side code & UML. See the UML (open in new tab) and demo video to the right. Still working on my presentation skills.</p>
        </div>
        <img class="w-1/4 m-10 min-w-80" alt="uml diagram" src={umlImg} />
        <iframe class="self-end min-w-80" width="400" height="300" src="https://www.youtube.com/embed/ohi5Bj-2WnQ?si=A3zEdDdH-lbVKK57" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80">
            <h class="py-4 font-semibold text-lg">This Website</h>
            <p class="py-4">&emsp;I have a list of things I would like to accomplish while working on this website. I hope to learn a lot about front-end development, especially frameworks as they are becoming increasingly relevant.</p>
            <p class="py-4">&emsp;The Web-Projects page has various projects that I have done to increase my web development proficiency.</p>
            <div class="flex flex-row justify-center">
                <a href="https://github.com/dean-blick/Website" target="_blank" class="mr-4 mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                    <h4 class="relative z-9">See this website on GitHub</h4>
                </a>
                <a href="webProjects" class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                    <h4 class="relative z-9">See Web-Projects</h4>
                </a>
            </div>
            
        </div>
        <MyList/>
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80">
            <h class="py-4 font-semibold text-lg">Point of Sale & Online Menu</h>
            <p class="py-4">&emsp;This is a semester-long project completed for CIS 400 at Kansas State. The goal of this project was to 
                become more experienced with object-oriented programming and web development by building a WPF/Razor Pages application.
            </p>
            <a href="https://github.com/dean-blick/PizzaParlor" target="_blank" class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                <h4 class="relative z-9">See this project on GitHub</h4>
            </a>
        </div>
        <ul class="w-1/3 min-w-80 mx-8 lg:mx-0 my-4 lg:my-0">
            <h class="font-semibold text-lg">Some concepts learned while completing this project:</h>
            <li>Abstract/virtual classes</li>
            <li>Event listeners and invokes</li>
            <li>Basic html and css concepts</li>
            <li>Queries, forms</li>
        </ul>
        
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80 pr-4">
            <h class="py-4 font-semibold text-lg">Scantron Program</h>
            <p class="py-4">&emsp;While working in IT at K-State, our bubble test scanning machine began to break down. We thought an upgrade to the machine and program was long overdue.
                Over the course of a few months I used my spare time to create and test a new scanning program. The program is still in use and has been handed off to another team.
            </p>
            <p class="py-4">&emsp;When creating the new program, I prioritized ease of use and lack of possible user error.
                I also added a grading feature based on a maximum of 3 scanned keys, allowing professors to acquire a gradebook for an assignment directly from the program, which would save a lot of time.
            </p>
            <a href="https://github.com/dean-blick/NewScantron" target="_blank" class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                <h4 class="relative z-9">See this project on GitHub</h4>
            </a>
        </div>
        <ul class="w-80 lg:w-auto mx-8 lg:mx-0 my-4 lg:my-0">
            <h class="font-semibold text-lg">Skills utilized:</h>
            <li>Working with legacy code</li>
            <li>Reading technical documentation</li>
            <li>Working with peers/professional associates</li>
        </ul>
        <ul class="w-80 lg:w-auto mx-8 lg:mx-0 my-4 lg:my-0">
            <h class="font-semibold text-lg">Technology utilized:</h>
            <li>WPF</li>
            <li>Event listening/invokes</li>
            <li>System IO, hex code manipulation</li>
        </ul>
    </ProjectItem>
    <ProjectItem>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80 lg:pr-8">
            <h class="py-4 font-semibold text-lg">Booth Creek Programs</h>
            <p class="py-4">&emsp;While working for Booth Creek Wagyu, I worked on multiple programs designed to improve efficiency of operation. </p>
            <p class="py-4">&emsp;Most of these projects involved using Python and Pandas to manipulate input data and return an expected output to a csv.
                There was also a project where I ended up using a web scraping package to retrieve data from a web-hosted database that did not offer any form of output.
            </p>
        </div>
        <div class="flex flex-col w-1/2 max-h-full overflow-auto min-w-80">
            <h class="py-4 font-semibold text-lg">Excel UPS API Call</h>
            <p class="py-4">&emsp; The most interesting project I worked on was to find a way to automatically retrieve UPS Ground shipping time.
                We already had a shipping matrix in Excel, so I decided to retrieve the shipping time via a call to the UPS API from within Excel.
            </p>
            <p> &emsp; I used VBA to create a new function that took a zipcode, and made an OAuth2 authentication request, and then a request for the shipping time.
                My biggest headache from this project was learning that VBA does not use utf-8, so I had to encode the request before sending it.
            </p>
        </div>
    </ProjectItem>
</div> 