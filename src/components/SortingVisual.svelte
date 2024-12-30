<script>
    import { run } from 'svelte/legacy';

    import { onMount } from "svelte";
    import { Canvas } from "svelte-canvas";

    let elementCount = $derived(300);
    let msDelay = $derived(2);
    let canvas = $state();
    let ctx;
    let offset = 10;

    const sortType = {
        bubble: "bubble",
        quick: "quick"
    };

    

    let listElements;
    run(() => {
        listElements = [{ elementLength: 1, currentPos: 0, isBeingEvaluated: false, currentPosIsCorrect: true }];
    }); 

    function CreateElements(elementCount) {
        listElements = [];
        for(let i = 0; i < elementCount; i++) {
            listElements.push({elementLength: i+1, currentPos: i, isBeingEvaluated: false, currentPosIsCorrect: false});
        }
        Shuffle();
    }

    async function bubbleSort() {
        let isSwapped;

        for (let i = 0; i < elementCount; i++) {
            isSwapped = false;

            for (let j = 0; j < elementCount - i - 1; j++) {
                if (listElements[j].elementLength > listElements[j + 1].elementLength) {
                    // Swap elements
                    SwapElements(j, j + 1);
                    
                    isSwapped = true;
                }
                
                setTimeout(drawCanvas(), 1000);
            }

            // If no two elements were swapped in the inner loop, array is sorted
            if (!isSwapped)
                break;
        }
        
    }

    function SwapElements(i, j) {
        [listElements[i], listElements[j]] = [listElements[j], listElements[i]]; 
        let tempPos = listElements[i].currentPos;
        listElements[i].currentPos = listElements[j].currentPos;
        listElements[j].currentPos = tempPos;
        if(listElements[i].elementLength - 1 == listElements[i].currentPos){
            listElements[i].currentPosIsCorrect = true;
        } else {
            listElements[i].currentPosIsCorrect = false;
        }
        if(listElements[j].elementLength - 1 == listElements[j].currentPos){
            listElements[j].currentPosIsCorrect = true;
        } else {
            listElements[j].currentPosIsCorrect = false;
        }
    }

    function Shuffle(){
        //Fisher-Yates shuffling algorithm
        for(let i = elementCount - 1; i >= 0; i--) {
            let newPos = Math.floor(Math.random() * (i + 1));
            SwapElements(i, newPos);
        }
    }

    function CreateExample() {
        CreateElements(elementCount);
    }

    async function drawCanvas() {
        offset = 0;
        let viewHeight = canvas.height;
        let viewWidth = canvas.width;
        let rectWidth = (viewWidth-(offset*2))/elementCount;
        let rectFractionHeight = viewHeight/elementCount;
        ctx.lineWidth = 1;
        ctx.clearRect(0, 0, viewWidth, viewHeight);
        ctx.fillStyle = "#60a5fa";
        for(let i = 0; i < elementCount; i++) {
            if(listElements[i].currentPosIsCorrect) ctx.fillStyle = "#008000";
            if(listElements[i].isBeingEvaluated) ctx.fillStyle = "#CBC3E3";
            ctx.fillRect(offset, viewHeight, rectWidth, -(rectFractionHeight*listElements[i].elementLength));
            offset += rectWidth;
            ctx.fillStyle = "#60a5fa";
        }
    }

    onMount(async () => {
        ctx = canvas.getContext('2d');
        CreateExample();
        drawCanvas();
    });
    

</script>

<div class="h-full">
    <canvas class="w-full h-[calc(60vh)]" width="2000" height="1000" bind:this={canvas}>

    </canvas>
    <button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white" onclick={() => bubbleSort()}>Submit</button>
</div>