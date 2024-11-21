
<script>
    import Line from "./gameLine.svelte"
    import wordsJSON from "../words.json"
    
    const words = wordsJSON.words;
    export let word = words[Math.round(Math.random()*words.length)]
    export let isCustom = false
    let wordLength = word.length
    function emptyArray(value){
        var r = []
        for(var i = 0; i<wordLength;i++){
            r.push(value)
        }
        return r
    }
    $: previous = []
    $: lineStatus = []
    $: input = emptyArray("")
    $: guessNumber = 0
    $: answerArray = emptyArray("")
    const guessMax = [0,1,2,3,4,5]
    $: keyPosition = 0;
    let fail = false
    let win = false
    function reset(){
        
        previous = []
        lineStatus = []
        input = emptyArray("")
        guessNumber = 0
        answerArray = emptyArray("")
        keyPosition = 0;
        fail = false
        win = false
        word = words[Math.round(Math.random()*words.length)]
        wordLength = word.length
        console.log(wordLength)
        if(isCustom){
            window.location.href = ("/game")
        }
    }
    function keyPress(event){
        if(win) return;
        if((event.key.length == 1)&&(keyPosition != wordLength)){
            input[keyPosition] = (event.key).toLowerCase()
            keyPosition++
        }
        if((event.key == "Backspace")&&(keyPosition != 0)){
            input[keyPosition - 1] = ""
            keyPosition--
        }
        if((event.key == "Enter")&&(keyPosition == wordLength)){
            let inputString = input.join("")
                //Add code to flip letters and check letter positions
                answerArray = word.split('')
                var newLineStatus = emptyArray(0)
                //Exact Check
                if(inputString == word){
                    win = true;
                    newLineStatus = emptyArray(3)
                }
                else{
                    //Direct Check
                    for(var i = 0; i < wordLength; i++){
                        if(input[i]==answerArray[i]){
                            newLineStatus[i] = 3
                            answerArray[i] = "\u0000"
                        }
                    }
                    //Similar Check
                    for(var i = 0; i < wordLength; i++){
                        if(newLineStatus[i] != 0) continue;
                        if(answerArray.indexOf(input[i]) != -1){
                            newLineStatus[i] = 2
                            answerArray[answerArray.indexOf(input[i])] = "\u0000"
                        }else{
                            newLineStatus[i] = 1
                        }
                    }
                }
                lineStatus.push(newLineStatus)
                previous.push(input)
                guessNumber++
                keyPosition = 0
                input = emptyArray("")

            if((guessNumber == 6)&&(!win)){
                fail = true
            }
        }
        
    }
    
</script>

<svelte:window on:keydown = {keyPress}></svelte:window>
<div class="flex flex-1 h-full justify-center relative">
    <div class="flex flex-col w-full justify-between">
        <div class="flex flex-col w-full items-center mt-10">
            <div class="">
                {#each guessMax as d,i}
                    {#if i == guessNumber}
                        <Line rowData={input} keyPosition={keyPosition}></Line>
                    {:else if i < guessNumber}
                        <Line rowData={previous[i]} lineStatus={lineStatus[i]}></Line>
                    {:else}
                        <Line rowData={emptyArray("")} lineStatus={emptyArray(0)}></Line>
                    {/if}
                {/each}
            </div> 
        </div>
        <div class="flex flex-row justify-center">
            <a href="/createGame" class="transition-all duration-1 border-gray-700 border-1 text-white bg-gray-700 hover:bg-yellow-400 focus:bg-lime-900 rounded-lg w-max px-2 py-1 mb-3">
                Make a custom game link
            </a>

        </div>
    </div>
    {#if fail||win}
    <div class="w-full h-full absolute flex justify-center items-center bottom-20">
        <div class="flex flex-row justify-center">
            <div class="flex flex-col bg-gray-800 h-24 w-72 p-5 rounded-lg border-1 border-gray-700 text-true-gray-500">
                {#if fail}
                    <div class="h-full">fail: the word is {word}</div>
                {:else if win}
                    <div class="h-full">Correct!</div>
                {/if}
                <button class=" self-center transition-all duration-0 border-gray-700 border-1 text-white bg-gray-700 hover:bg-yellow-400 focus:bg-lime-900 rounded-lg w-max px-2 py-1 mt-3" on:click={reset}>New Game</button>
            </div>
        </div>
    </div>
    {/if}
</div>