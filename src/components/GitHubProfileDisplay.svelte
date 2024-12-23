<script>
    import { onMount } from "svelte";
    import TextInput from "./TextInput.svelte";
    import FixedPopUp from "./FixedPopUp.svelte";
    let dataGood;
    let login;
    let avatar;
    let repoCount;
    let followers;
    let following;
    let reposLink;
    let name;
    let createdAtDate;


    async function fetchData(profileName) {
        if(profileName == "") profileName = "dean-blick";
        
        fetch(`https://api.github.com/users/${profileName}`)
		.then(response => { 
		   console.log(' response', response)
		   response.json()
			   .then(json => {
					console.log('json', json)
				    dataGood = json;
                    login = json.login;
                    avatar = json.avatar_url;
                    repoCount = json.public_repos;
                    followers = json.followers;
                    following = json.following;
                    reposLink = `https://github.com/${profileName}?tab=repositories`;
                    name = json.name;
                    createdAtDate = json.created_at;
                    createdAtDate = createdAtDate.substring(0, createdAtDate.indexOf('T'));
		     })
		     .catch(error => console.log(error))
	})
    }

    onMount(async () => {
        fetchData("dean-blick");
    });

    async function getGitHubProfile(profileName) {
        fetchData(profileName);
    }
</script>

<div class="flex flex-col items-center">
    
    {#await dataGood }
        <div>Waiting for profile..</div>
    {:then result }
        <div class="flex flex-col w-full items-center">
            <h1 class="text-lg font-semibold">{name}</h1>
            <div class="flex flex-row">
                <img src={avatar} alt="" class="rounded-3xl size-64 my-4"/>
            </div>
            <div>{"Public repos: " + repoCount}</div>
            <div>{"Followers: " + followers}</div>
            <div>{"Following: " + following}</div>
            <div>{"GitHub user since: " + createdAtDate}</div>
            <div class="flex flex-row justify-between">
                <a href={reposLink} target="_blank" class="mb-4 customShadow relative overflow-hidden px-5 py-2 mt-6 mr-4 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center">
                    <h4 class="relative z-9">Go to this profile's repos page</h4>
                </a>
                <FixedPopUp buttonText="See JSON result as string" overlayHeader="JSON Result">
                    {JSON.stringify(result, null, 2)}
                </FixedPopUp>
            </div>
            
        </div>
        
    {:catch error }
        <div>{"Error getting profile: " + error.message}</div>
    {/await}

    <TextInput outFunction={getGitHubProfile} placeholderText="GitHub Username"/>
</div>