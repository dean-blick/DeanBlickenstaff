<script>
    import { onMount } from "svelte";
    import TextInput from "./TextInput.svelte";
    import FixedPopUp from "./FixedPopUp.svelte";
    var data;
    let response;
    let resultText;

    onMount(async () => {
        response = await fetch('https://api.github.com/users/dean-blick');
        data = await response.json();
    });

    async function getGitHubProfile(profileName) {
        response = await fetch(`https://api.github.com/users/${profileName}`);
        data = await response.json();
    }
</script>

<div class="flex flex-col">
    
    {#await data }
        <div>Waiting for profile..</div>
    {:then result }
        <div class="flex flex-col w-full">
            <div class="flex flex-row">
                <!--<img src= alt=""/>-->
            </div>
            <FixedPopUp buttonText="See JSON result as string" overlayHeader="JSON Result">
                {JSON.stringify(result, null, 2)}
            </FixedPopUp>
        </div>
        
    {:catch error }
        <div>{"Error getting profile: " + error.message}</div>
    {/await}

    <TextInput outFunction={getGitHubProfile} placeholderText="GitHub Username"/>
</div>