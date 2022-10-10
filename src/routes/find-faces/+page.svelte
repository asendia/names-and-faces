<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Photo from '$lib/Photo.svelte';
	import { loadData } from '$lib/storage';
	import { isSlackProfileEqual, type SlackProfile } from '$lib/profile';
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

	function continueGame() {
		correct = undefined;
		if (biasedData.length === 0) {
			started = false;
			return;
		}
		const randomID = Math.floor(Math.random() * biasedData.length);
		userProfile = biasedData[randomID].profile;
		started = true;
	}

	function guessName(profile: SlackProfile) {
		if (correct !== undefined) {
			continueGame();
			return;
		}
		correct = isSlackProfileEqual(userProfile, profile);
		if (correct) {
			const id = biasedData.findIndex((u) => isSlackProfileEqual(u.profile, profile));
			biasedData.splice(id, 1);
			biasedData = biasedData;
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Find faces</title>
	<meta name="description" content="Find faces based on names" />
</svelte:head>

<a href="../"><Button type="secondary">Back</Button></a>
{#if !started}
	<div class="flex items-center justify-center h-[70vh] md:h-[80vh]">
		<Button on:click={continueGame}>Find Faces</Button>
	</div>
{/if}

<div class="flex flex-col items-center">
	{#if started}
		<div class="bg-gray-200 rounded-md">
			<div class={correct === undefined ? 'opacity-0' : ''}>
				<Photo src={userProfile.image_original} alt={userProfile.real_name} />
			</div>
		</div>
		<div
			class={`text-center mt-2 ${
				correct ? 'text-green-700' : correct === false ? 'text-red-500' : ''
			}`}
		>
			{userProfile.real_name}{userProfile.display_name ? ` (${userProfile.display_name})` : ''}
		</div>
		<div
			class={`text-center font-light text-sm mb-2 ${
				correct ? 'text-green-700' : correct === false ? 'text-red-500' : 'text-gray-500'
			}`}
		>
			{userProfile.title}
		</div>
	{/if}
</div>

<div class={`flex flex-col items-center justify-center h-[50px]`}>
	{#if correct !== undefined}
		<Button on:click={continueGame}>Next</Button>
	{/if}
</div>

{#if started}
	<div class="flex flex-wrap">
		{#each data as u}
			<div class="w-1/2 sm:w-1/3 md:w-1/5 xl:w-[14.285714%] 2xl:w-[10%] p-2 flex justify-center">
				<button on:click={() => guessName(u.profile)}
					><Photo src={u.profile.image_original} alt={u.profile.real_name} /></button
				>
			</div>
		{/each}
	</div>
{/if}
