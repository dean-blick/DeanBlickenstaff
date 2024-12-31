<script lang="ts">
    import { tick } from "svelte";
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { draw } from "svelte/transition";


    let elementCount = $state(100);
    let msDelay = $state(2);
    let canvas;
    let ctx;
    let offset = 10;
    let bubbleRunning = $state(false);

    let drawing = $state(false);

    const sortType = {
        bubble: "bubble",
        quick: "quick"
    };

    

    let listElements;

    function CreateElements(elementCount) {
        listElements = [];
        for(let i = 0; i < elementCount; i++) {
            listElements.push({elementLength: i+1, currentPos: i, isBeingEvaluated: false, currentPosIsCorrect: false});
        }
        Shuffle();
    }

    

    async function RunBubble() {
        const iterator = bubbleSort();
        bubbleRunning = true;
        let prevElement;
        while(bubbleRunning) {
            const next = iterator.next();
            if(!next.done) {
                
                
                //listElements[next.value].isBeingEvaluated = true;
                //prevIndex = next.value?;
                setTimeout(() => 0, 100)
            }
        }
        
    }

    function* bubbleSort() {
        let isSwapped;

        for (let i = 0; i < elementCount; i++) {
            isSwapped = false;

            for (let j = 0; j < elementCount - i - 1; j++) {
                if (listElements[j].elementLength > listElements[j + 1].elementLength) {
                    // Swap elements
                    SwapElements(j, j + 1);
                    yield j;
                    isSwapped = true;
                }
                
                
            }

            // If no two elements were swapped in the inner loop, array is sorted
            if (!isSwapped) {
                bubbleRunning = false;
                break;
            }
            
        }
        bubbleRunning = false;
    }

    function drawCanvas() {
        requestAnimationFrame(drawCanvas);
        canvas?.redraw();
    }

    //ideas: animation loop??
    //send manual function calls between animation and calculation (bad idea)
    //separate thread?


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


    const render: Render = ({ context, width, height }) => {
        offset = 0;
        let rectWidth = (width-(offset*2))/elementCount;
        let rectFractionHeight = height/elementCount;
        context.lineWidth = 1;
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#60a5fa";
        for(let i = 0; i < elementCount; i++) {
            if(listElements[i].currentPosIsCorrect) context.fillStyle = "#008000";
            if(listElements[i].isBeingEvaluated) context.fillStyle = "#CBC3E3";
            context.fillRect(offset, height, rectWidth, -(rectFractionHeight*listElements[i].elementLength));
            offset += rectWidth;
            context.fillStyle = "#60a5fa";
        }
    };

    

    $effect(() => {
        ctx = canvas?.context;
        CreateExample();
        drawCanvas();
    });


    
    //One sort and draw occurs within the tick, then the next sort and draw wait for the current tick to end before starting
    //function Tick() {

    //}

</script>

<div class="h-full">
    <Canvas autoplay class="w-full h-[calc(60vh)]" width = {1400} height = {600} bind:this={canvas}>
        <Layer {render}/>
    </Canvas>
    <button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white" onclick={() => RunBubble()}>Submit</button>
</div>