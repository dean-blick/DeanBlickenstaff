<script>
    export let buttonText;
    export let selectorFunction;
    export let isSelected = false;
    export let identifier;
    export let switchCondition;


    export function Unselect() {
        isSelected = false;
    }
    function Select() {
        selectorFunction(identifier);
        isSelected = true;
    }
</script>

<button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white {isSelected ? "bg-slate-500" : "bg-transparent border border-slate-100 "}" onclick={() => !isSelected && switchCondition && Select()}>{buttonText}</button>
