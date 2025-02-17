<script>
    import WebProjectItem from "./WebProjectItem.svelte";
    import ToDoList from "./ToDoList.svelte";
    import FixedPopUp from "./FixedPopUp.svelte";
    import AbsolutePopUp from "./AbsolutePopUp.svelte";
    import GitHubProfileDisplay from "./GitHubProfileDisplay.svelte";

</script>

<div class="flex flex-col">
    <WebProjectItem>
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center">
            <h class="py-4 font-semibold text-lg">Custom Wordle</h>
            <a href="game" class="customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                <h4 class="relative z-9">Click here to play</h4>
            </a>
        </div>
    </WebProjectItem>
    <WebProjectItem>
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center mb-2">
            <h class="py-4 font-semibold text-lg">To-Do List</h>
            <p>A classic</p>
            <FixedPopUp buttonText="See ideas reinforced" overlayHeader="Concepts/Ideas">
                <div class="flex flex-col">
                    <p>&#8226; Reactive list of objects containing a boolean and string</p>
                    <p>&#8226; Accessing items in a list</p>
                    <p>&#8226; CSS styling</p>
                    <h1 class="py-4">From creating overlay:</h1>
                    <p>&#8226; Svelte stores</p>
                    <p>&#8226; Reusable Svelte components</p>
                    <p>&#8226; Fixed and absolute positioning</p>
                </div>
            </FixedPopUp>
        </div>
        
        <div class="flex flex-col bg-black/30 backdrop-blur-sm w-full m-8 lg:w-1/2 items-center rounded-lg p-2 z-0">
            <ToDoList/>
        </div>
    </WebProjectItem>
    <WebProjectItem>
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center mb-2">
            <h class="py-4 font-semibold text-lg">GitHub Profile Fetcher</h>
            <FixedPopUp buttonText="See ideas reinforced" overlayHeader="Concepts/Ideas">
                <div class="flex flex-col">
                    <p>&#8226; CSS note: A value other than none for the filter property results in the creation of a containing block for absolute and fixed positioned descendants</p>
                    <p>&#8226; Svelte note: Do not access object properties through in-line html script</p>
                    <p>&#8226; Asynchronous functions</p>
                    <p>&#8226; Fetch/await/promises/responses/results</p>
                </div>
            </FixedPopUp>
        </div>
        
        <div class="flex flex-col w-full max-h-full bg-black/30  m-8 lg:w-1/2 items-center rounded-lg p-2 relative">
            <GitHubProfileDisplay/>
        </div>
    </WebProjectItem>
    <WebProjectItem>
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center relative z-0 ">
            <h class="py-4 font-semibold text-lg">Sorting Algorithm Visualiser</h>
            <FixedPopUp buttonText="See ideas reinforced" overlayHeader="Concepts/Ideas">
                <div class="flex flex-col">
                    <p>&#8226; Generator/Iterator functions</p>
                    <p>&#8226; Reactivity</p>
                    <p>&#8226; Error prevention</p>
                    <p>&#8226; Responsiveness</p>
                    <p>&#8226; Reusable components</p>
                    <p>&#8226; Promises</p>
                </div>
            </FixedPopUp>
            <div class="flex flex-row justify-center items-center bg-black/30 backdrop-blur-sm w-full lg:w-1/2">
                <a href="sortingVisual" class="customShadow relative overflow-hidden px-5 py-2 my-4 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                    <h4 class="relative">Go to this project</h4>
                </a>
            </div>
        </div>
    </WebProjectItem>
    <WebProjectItem>
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center relative z-0 ">
            <h class="py-4 font-semibold text-lg">Online Game Lobby</h>
            <FixedPopUp buttonText="See ideas reinforced" overlayHeader="Concepts/Ideas">
                <div class="flex flex-col">
                    <p>&#8226; Internal Rest APIS</p>
                    <p>&#8226; Cloud DB (MongoDB)</p>
                </div>
            </FixedPopUp>
            <div class="flex flex-row justify-center items-center bg-black/30 backdrop-blur-sm w-full lg:w-1/2">
                <a href="lobby" class="customShadow relative overflow-hidden px-5 py-2 my-4 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                    <h4 class="relative">Go to this project</h4>
                </a>
            </div>
        </div>
    </WebProjectItem>
</div>