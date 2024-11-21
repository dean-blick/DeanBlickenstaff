<script>
    import Game from "../../../components/game.svelte"
    import { onMount } from "svelte"
    
    let urlStr = "";
    let word = "";
    let loaded = false;

    function decrypt(urlStr){
        var finalDecrypt = ""
        for(var i = 0; i<urlStr.length; i +=3 ){
            //THis loop takes groups of 3 numbers to convert back to the word and adds the character to the word string
            finalDecrypt += String.fromCharCode(Number(urlStr.substring(i, i + 3)))
        }
        return finalDecrypt.toLowerCase()
    }

    onMount(() => {
        let splitPath = location.toString().split("/");
        urlStr = (splitPath[splitPath.length-1]);
        word = decrypt(urlStr)
        loaded = true;
    })
</script>



{#if loaded}
    <Game word={word} isCustom={true}></Game>
{/if}
