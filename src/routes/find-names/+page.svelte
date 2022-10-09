<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Photo from '$lib/Photo.svelte';
	import type { SlackProfile } from '$lib/profile';
	import { loadData } from '$lib/storage';
	import { onMount } from 'svelte';
	let data: Array<{ profile: SlackProfile }> = [];
	onMount(() => {
		data = loadData();
		filtered = data;
		data.forEach((u) => {
			for (let i = 0; i < 1; i++) {
				biasedData.push(u);
			}
		});
	});
	let userProfile: SlackProfile;
	let biasedData: typeof data = [];
	let started = false;
	let correct: boolean | undefined;
	let filter = '';
	let filtered: typeof data = [];

	function startGame() {
		filter = '';
		filtered = data;
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
	<title>Find names</title>
	<meta name="description" content="Find names based on photos" />
</svelte:head>

{#if !started}
	<div class="flex justify-center">
		<Button on:click={startGame}>Start</Button>
	</div>
{/if}

<div class="flex flex-col items-center mb-2">
	{#if started}
		<Photo src={userProfile.image_original} alt={userProfile.real_name} />
		<div class={correct === undefined ? 'opacity-0' : ''}>
			<div class={`mt-2 text-center ${correct ? 'text-green-700' : 'text-red-500'}`}>
				{userProfile.real_name}{userProfile.display_name ? ` (${userProfile.display_name})` : ''}
			</div>
			<div class={`text-center font-light text-sm ${correct ? 'text-green-700' : 'text-red-500'}`}>
				({userProfile.title})
			</div>
		</div>
	{/if}
</div>

{#if started}
	<div class="max-w-lg mx-auto">
		<label for="search-by-name" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label
		>
		<div class="relative">
			<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<svg
					aria-hidden="true"
					class="w-5 h-5 text-gray-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</div>
			<div class="flex">
				<input
					value={filter}
					autocomplete="off"
					type="text"
					id="search-by-name"
					class="block px-4 py-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search Name..."
					on:keyup={(e) => {
						if (e.key === 'Enter') {
							if (correct !== undefined) {
								startGame();
								return;
							}
							if (filtered.length !== 1) return;
							guessName(filtered[0].profile.real_name);
							return;
						}
						filter = e.currentTarget.value.toLowerCase();
						filtered = data.filter((u) => {
							return (
								u.profile.real_name.toLowerCase().includes(filter) ||
								u.profile.display_name.toLowerCase().includes(filter)
							);
						});
					}}
				/>
				<div class="w-2" />
				<Button on:click={startGame}>Next</Button>
			</div>
		</div>
	</div>
	<div class="flex flex-wrap justify-around max-w-5xl mx-auto mt-3">
		{#each filtered as u}
			<div class="m-2">
				<Button on:click={() => guessName(u.profile.real_name)} type="secondary"
					>{u.profile.real_name}{u.profile.display_name
						? ` (${u.profile.display_name})`
						: ''}</Button
				>
			</div>
		{/each}
	</div>
{/if}
