<script>
    import TextInput from "./TextInput.svelte";
    let listItem = {checked: false, s: ""};
    $: listItems = [{checked: false, s: "Example Item"}];
    let currentString = "";
    function newToDoItem(newString) {
        listItems = [{checked: false, s:newString}, ...listItems];
    }
    function removeToDoItem(index){
        listItems.splice(index, 1);
        listItems = listItems;
    }
</script>
<div class="overflow-y-auto w-full h-80 max-h-80 content-end flex flex-col-reverse">
    {#each listItems as item}
    <div class="flex flex-row justify-start h-8 items-center my-2">
        <input type="checkbox" class="mx-4" checked={item.checked}/>
        <p>{item.s}</p>
        <button class="border-dark-100 border-1 rounded-lg px-2 py-1 mx-4 text-white ml-auto" on:click={removeToDoItem(listItems.indexOf(item))}><i class="fa-solid fa-trash-can"></i></button>
    </div>
    {/each}
</div>
<div class="m-4">
    <TextInput outFunction={newToDoItem}/>
</div>
