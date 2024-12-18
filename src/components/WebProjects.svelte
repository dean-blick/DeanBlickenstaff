<script>
    import WebProjectItem from "./WebProjectItem.svelte";
    import ToDoList from "./ToDoList.svelte";
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
        <div class="flex flex-col w-full max-h-full overflow-auto min-w-80 items-center mb-10">
            <h class="py-4 font-semibold text-lg">To-Do List</h>
            <p>A classic</p>
        </div>
        <div class="flex flex-col bg-black/30 backdrop-blur-sm w-full m-8 lg:w-1/2 items-center">
            <ToDoList/>
        </div>
    </WebProjectItem>
    <WebProjectItem>
        
    </WebProjectItem>
    <WebProjectItem>
        
    </WebProjectItem>
</div>