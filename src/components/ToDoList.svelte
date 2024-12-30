<script>
    import { run } from 'svelte/legacy';

    import TextInput from "./TextInput.svelte";
    let listItem = {checked: false, s: ""};
    let listItems;
    run(() => {
        listItems = [{checked: false, s: "Example Item"}];
    });
    let currentString = "";
    function newToDoItem(newString) {
        listItems = [{checked: false, s:newString}, ...listItems];
    }
    function removeToDoItem(index){
        listItems.splice(index, 1);
        listItems = listItems;
    }
    function moveToDoItem(index, direction) {
        if(direction && index != listItems.length - 1){
            [listItems[index + 1], listItems[index]] = [listItems[index], listItems[index + 1]];
        }else if(!direction && index != 0) {
            [listItems[index - 1], listItems[index]] = [listItems[index], listItems[index - 1]];
        }
    }
</script>
<div class="overflow-y-auto w-full h-80 max-h-80 content-end flex flex-col-reverse">
    {#each listItems as item}
    <div class="flex flex-row justify-start h-8 items-center my-2">
        <input type="checkbox" class="mx-4" checked={item.checked}/>
        <p>{item.s}</p>
        <button class="border-dark-100 border-1 rounded-lg py-1 mx-2 text-white ml-auto" onclick={moveToDoItem(listItems.indexOf(item), false)}><i class="fa-solid fa-arrow-down"></i></button>
        <button class="border-dark-100 border-1 rounded-lg py-1 mx-2 text-white" onclick={moveToDoItem(listItems.indexOf(item), true)}><i class="fa-solid fa-arrow-up"></i></button>
        <button class="border-dark-100 border-1 rounded-lg py-1 mx-4 text-white" onclick={removeToDoItem(listItems.indexOf(item))}><i class="fa-solid fa-trash-can"></i></button>
    </div>
    {/each}
</div>
<div class="m-4">
    <TextInput placeholderText="To-Do Text" outFunction={newToDoItem}/>
</div>
