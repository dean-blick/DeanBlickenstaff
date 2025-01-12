<script lang="ts">
	import { onMount, tick } from "svelte"
	import { Canvas, Layer, type Render } from "svelte-canvas"
	import Selector from "./Selector.svelte"
	import Page from "../routes/+page.svelte"

	let elementCount = $state(100)
	let msDelay = $state(1)
	let canvas
	let offset = 10
	let bubbleRunning = $state(false)
	let quickRunning = $state(false)
	let mergeRunning = $state(false)
	let selectionRunning = $state(false)

	let drawing = $state(false)

	let isSorting = $state(false)

	const sortType = {
		bubble: "Bubble",
		quick: "Quick",
		merge: "Merge",
		selection: "Selection"
	}

	let currentMethod = sortType.bubble

	let listElements = $state([])

	function CreateElements(elementCount) {
		listElements = []
		for (let i = 0; i < elementCount; i++) {
			listElements.push({
				elementLength: i,
				currentPos: i,
				isBeingEvaluated: false,
				currentPosIsCorrect: false,
			})
		}
		Shuffle()
	}

	async function RunBubble() {
		const iterator = bubbleSort()
		bubbleRunning = true
		let prevElement
		SetCorrectElements()
		while (bubbleRunning) {
			let next = iterator.next()
			if (!next.done) {
				SetCorrectElements()
				await sleep(msDelay)
				let prev
				if (typeof next.value == "number") prev = next.value
				try {
					listElements[prev].isBeingEvaluated = false
					listElements[prev + 1].isBeingEvaluated = false
				} catch {}
				if (isSorting == false) return
			}
		}
	}

	function* bubbleSort() {
		let isSwapped

		for (let i = 0; i < elementCount; i++) {
			isSwapped = false

			for (let j = 0; j < elementCount - i - 1; j++) {
				listElements[j].isBeingEvaluated = true
				if (
					listElements[j].elementLength >
					listElements[j + 1].elementLength
				) {
					SwapElements(j, j + 1)
					isSwapped = true
				}
				yield j
			}
			yield i
			if (!isSwapped) {
				bubbleRunning = false
				isSorting = false
				break
			}
		}
		bubbleRunning = false
		isSorting = false
	}

	async function RunSelection() {
		const iterator = SelectionSort()
		selectionRunning = true
		let prevElement
		SetCorrectElements()
		while (selectionRunning) {
			let next = iterator.next()
			if (!next.done) {
				SetCorrectElements()
				await sleep(msDelay)
				let prev
				if (typeof next.value == "number") prev = next.value
				try {
					listElements[prev].isBeingEvaluated = false
					listElements[prev + 1].isBeingEvaluated = false
				} catch {}
				if (isSorting == false) return
			}
		}
	}

	function* SelectionSort() {
		const n = listElements.length;

		for (let i = 0; i < n; i++) {
		let min = i;
		for (let j = i + 1; j < n; j++) {
			if (listElements[j].elementLength < listElements[min].elementLength) {
				min = j
			}
			listElements[j].isBeingEvaluated = true;
			yield j
		}
		if (min != i) {
			SwapElements(i, min)
		}
		listElements[i].isBeingEvaluated = true;
		yield i
		}
	}

	async function RunMerge() {
        const iterator = mergeSortStart(0, listElements.length - 1)
		mergeRunning = true
		let prev
		while (mergeRunning) {
			let next = iterator.next()
			if (!next.done) {
				SetCorrectElements()
				await sleep(msDelay)
				let prev
				if (typeof next.value == "number") prev = next.value
				try {
					listElements[prev].isBeingEvaluated = false
					listElements[prev + 1].isBeingEvaluated = false
				} catch {}
				if (isSorting == false) return
			} else {
                mergeRunning = false
                isSorting = false
            }
		}
    }

	function* MergeSort (l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const left = new Array(n1);
        const right = new Array(n2);

        for (let i = 0; i < n1; i++) {
            left[i] = listElements[l + i];
        }
        for (let j = 0; j < n2; j++) {
            right[j] = listElements[m + 1 + j];
        }

        let i = 0;

        let j = 0;

        let k = l;

        while (i < n1 && j < n2) {
			listElements[k].isBeingEvaluated = true;
            yield k
            if (left[i].elementLength <= right[j].elementLength) {
            listElements[k] = left[i];
            i++;
            } else {
            listElements[k] = right[j];
            j++;
            }
            k++;
        }

        while (i < n1) {
            listElements[k] = left[i];
			listElements[k].isBeingEvaluated = true;
            yield k;
            i++;
            k++;
        }

        while (j < n2) {
            listElements[k] = right[j];
			listElements[k].isBeingEvaluated = true;
            yield k;
            j++;
            k++;
        }
    };

    function* mergeSortStart (l,r){
    if (l < r) {
        const m = l + Math.floor((r - l) / 2);
        yield* mergeSortStart(l, m);
        yield* mergeSortStart(m + 1, r);
        yield* MergeSort(l, m, r);
    }
    };

	async function RunQuick() {
        const iterator = QuickSort(0, listElements.length - 1)
		quickRunning = true
		let prev
		while (quickRunning) {
			let next = iterator.next()
			if (!next.done) {
				SetCorrectElements()
				await sleep(msDelay)
				let prev
				if (typeof next.value == "number") prev = next.value
				try {
					listElements[prev].isBeingEvaluated = false
					listElements[prev + 1].isBeingEvaluated = false
				} catch {}
				if (isSorting == false) return
			} else {
                quickRunning = false
                isSorting = false
            }
		}
    }

    function* QuickSortPartition(left, right) {
        const pivot = listElements[Math.floor((right + left) / 2)]
        let i = left
        let j = right
        while (i <= j) {
            while (listElements[i].elementLength < pivot.elementLength) {
                i++
                listElements[i].isBeingEvaluated = true
                yield i
            }
            while (listElements[j].elementLength > pivot.elementLength) {
                j--
                listElements[j].isBeingEvaluated = true
                yield j
            }
            if (i <= j) {
                SwapElements(i, j)
                i++
                j--
            }
            yield j
        }
        return i;
    }

    function* QuickSort(left, right) {
        let index;
        if (listElements.length > 1) {
            index = yield* QuickSortPartition(left, right)
            if (left < index - 1) {
                yield* QuickSort(left, index - 1)
            }
            if (index < right) {
                yield* QuickSort(index, right)
            }
        }
    }

	function switchSortingMethod(method) {
		currentMethod = method
	}

	function runSelectedSortingMethod() {
		switch (currentMethod) {
			case sortType.bubble:
				RunBubble()
				break
			case sortType.merge:
				RunMerge()
				break
			case sortType.quick:
				RunQuick()
				break
			case sortType.selection:
				RunSelection()
				break
		}
	}

	function StartSorting() {
		isSorting = true
		runSelectedSortingMethod()
	}

	function StopSorting() {
		isSorting = false
	}

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	function SwapElements(i, j) {
		[listElements[i], listElements[j]] = [listElements[j], listElements[i]]
		let tempPos = listElements[i].currentPos
		listElements[i].currentPos = listElements[j].currentPos
		listElements[j].currentPos = tempPos
	}

	function SetCorrectElements() {
		listElements.forEach(element => {
			element.currentPos = listElements.indexOf(element)
			if (element.elementLength == element.currentPos) {
				element.currentPosIsCorrect = true
			} else {
				element.currentPosIsCorrect = false
			}
		});
	}

	function Shuffle() {
		//Fisher-Yates shuffling algorithm
		for (let i = elementCount - 1; i >= 0; i--) {
			let newPos = Math.floor(Math.random() * (i + 1))
			SwapElements(i, newPos)
		}
		SetCorrectElements()
	}

	function CreateExample() {
		CreateElements(elementCount)
	}

	const render: Render = ({ context, width, height }) => {
		offset = 0
		let rectWidth = (width - offset * 2) / elementCount
		let rectFractionHeight = height / elementCount
		context.lineWidth = 1
		context.clearRect(0, 0, width, height)
		for (let i = 0; i < elementCount; i++) {
			if (listElements[i].isBeingEvaluated) {
				context.fillStyle = "#CBC3E3"
			} else if (listElements[i].currentPosIsCorrect) {
				context.fillStyle = "#008000"
			} else {
				context.fillStyle = "#60a5fa"
			}

			context.fillRect(
				offset,
				height,
				rectWidth,
				-(rectFractionHeight * (listElements[i].elementLength + 1))
			)
			offset += rectWidth
			context.fillStyle = "#60a5fa"
		}
	}

	onMount(() => {
		console.log("onMount ran!")
		CreateExample()
	})
</script>

<div class="h-full">
	<Canvas
		autoplay
		class="w-full h-[calc(60vh)]"
		width={1400}
		height={600}
		bind:this={canvas}>
		<Layer {render} />
	</Canvas>
	<div class="py-4"></div>
	<Selector
		options={["Bubble", "Quick", "Merge", "Selection"]}
		switchCondition={!isSorting}
		exportFunction={switchSortingMethod}
	/>
	<button
		class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white"
		onclick={isSorting ? () => StopSorting() : () => StartSorting()}>
        {isSorting ? "Stop" : "Start"}
    </button>
	<button
		class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white"
		onclick={() => !isSorting && Shuffle()}>
        Shuffle
    </button>
</div>
