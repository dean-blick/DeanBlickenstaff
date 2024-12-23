<script>
    let checklist;
    checklist = [
        "☑ Add CIS400 project",
        "☑ Add Scantron project",
        "☑ Add booth creek project overview",
        "☑ Add mobile responsiveness",
        "☐ Add more web projects",
        "☐ Add headshot",
        "☑ Host",
        "☐ Get good domain name?",
        "☐ Add experience summary"
    ]
</script>

<div class="w-1/3 scroll-auto min-w-56 mx-4 lg:mx-0 my-8 lg:my-0">
    {#each checklist as item}
        <div>
            {item}
        </div>
    {/each}
</div>