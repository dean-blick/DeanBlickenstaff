<script>
    import { onMount } from "svelte";
    import TextInput from "./TextInput.svelte";
    let data;
    let response;

    onMount(async () => {
        response = await fetch('https://api.github.com/users/dean-blick');
        data = response.json();
        {data}
    });

    async function getGitHubProfile(profileName) {
        response = await fetch(`https://api.github.com/users/${profileName}`);
        data = response.json();
        {"Function ran"}
    }
</script>

<div class="flex flex-col">

    {#await data }
        <div>Waiting for profile..</div>
    {:then result }
        <div>{JSON.stringify(result, null, 2)}</div>
    {:catch error }
        <div>{"Error getting profile: " + error.message}</div>
    {/await}

    <TextInput outFunction={getGitHubProfile} placeholderText="GitHub Username"/>
</div>