<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import Photo from '$lib/Photo.svelte';
	import { loadData } from '$lib/storage';
	import example from '$lib/data/example-slack.json';
	import { onMount } from 'svelte';
	let data = example;
	onMount(() => {
		data = loadData();
	});
</script>

<svelte:head>
	<title>Names and Faces</title>
	<meta name="description" content="Train yourself to memorize names and faces" />
</svelte:head>

<h1 class="text-center font-medium leading-tight text-5xl mt-0 mb-6 text-blue-500">
	Names and Faces
</h1>
<p class="text-center mb-8">
	How to memorize names and faces: <a
		class="text-blue-500 underline"
		target="_blank"
		href="https://www.wikihow.com/Memorize-Names-and-Faces">WikiHow</a
	><br />
	Or you can train yourself to memorize names and faces:
</p>
<div class="flex flex-col md:flex-row justify-center mb-12">
	<Button on:click={() => goto('./find-names')}>Find Names</Button>
	<div class="h-2 w-2" />
	<Button on:click={() => goto('./find-faces')}>Find Faces</Button>
	<div class="h-2 w-2" />
	<Button type="secondary" on:click={() => goto('./settings')}>Customize</Button>
</div>
<div class="flex flex-wrap">
	{#each data as u}
		<div class="w-1/2 md:w-1/5 xl:w-[10%] p-2 flex flex-col">
			<Photo src={u.profile.image_original} alt={u.profile.real_name} />
			<div class="text-center mt-2">{u.profile.real_name}</div>
			<div class="text-center font-light text-sm mt-1">({u.profile.title})</div>
		</div>
	{/each}
</div>
