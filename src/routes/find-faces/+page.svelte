<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Photo from '$lib/Photo.svelte';
	import { loadData } from '$lib/storage';
	import type { SlackProfile } from 'src/lib/profile';
	import { onMount } from 'svelte';
	let data: Array<{ profile: SlackProfile }> = [];
	onMount(() => {
		data = loadData();
		data.forEach((u) => {
			for (let i = 0; i < 1; i++) {
				biasedData.push(u);
			}
		});
		userProfile = biasedData[0].profile;
	});
	let biasedData: Array<{ profile: SlackProfile }> = [];

	let userProfile: SlackProfile;
	let started = false;
	let correct: boolean | undefined;

	function startGame() {
		const randomID = Math.floor(Math.random() * biasedData.length);
		correct = undefined;
		userProfile = biasedData[randomID].profile;
		started = true;
	}

	function guessName(name: string) {
		correct = userProfile.real_name === name;
		if (correct) {
			const id = biasedData.findIndex((u) => u.profile.real_name === name);
			biasedData.splice(id, 1);
			biasedData = biasedData;
		}
	}
</script>

<svelte:head>
	<title>Find faces</title>
	<meta name="description" content="Find faces based on names" />
</svelte:head>

{#if !started}
	<div class="flex items-center justify-center h-[60px]">
		<Button on:click={startGame}>Start</Button>
	</div>
{/if}
<div class="flex flex-col items-center h-[340px]">
	{#if started}
		<div class="text-center">
			{userProfile.real_name} ({userProfile.display_name})
		</div>
		<div class="text-center font-light text-sm mb-2">
			({userProfile.title})
		</div>
		{#if correct !== undefined}
			<Photo src={userProfile.image_original} alt={userProfile.real_name} />
		{/if}
	{/if}
</div>

<div class="flex flex-col items-center justify-center h-[60px]">
	{#if correct !== undefined}
		<Button on:click={startGame}>Next</Button>
	{/if}
</div>

{#if started}
	<div class="flex flex-wrap">
		{#each data as u}
			<div class="w-1/2 md:w-1/5 xl:w-[10%] p-2 flex justify-center">
				<button on:click={() => guessName(u.profile.real_name)}
					><Photo src={u.profile.image_original} alt={u.profile.real_name} /></button
				>
			</div>
		{/each}
	</div>
{/if}
