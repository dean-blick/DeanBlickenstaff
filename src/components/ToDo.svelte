<script>
    let checklist;
    checklist = [
        "Add CIS400 project",
        "Add Scantron project",
        "Add booth creek project overview",
        "Add more web projects",
        "Add headshot",
        "Host through firebase",
        "Get good domain name?",
        "Add experience summary"
    ]
</script>

<div class="w-1/3 scroll-auto">
    {#each checklist as item}
        <div>
            &#9744; {item}
        </div>
    {/each}
</div>