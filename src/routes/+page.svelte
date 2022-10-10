<script lang="ts">
	import Button from '$lib/Button.svelte';
	import example from '$lib/data/example-slack.json';
	import Photo from '$lib/Photo.svelte';
	import { loadData } from '$lib/storage';
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

<h1 class="text-center font-medium leading-tight text-4xl sm:text-5xl my-4 text-blue-500">
	Names and Faces
</h1>
<p class="md:text-center mb-4 md:mb-12">
	How to memorize names and faces: <a
		class="text-blue-500 underline"
		target="_blank"
		href="https://www.wikihow.com/Memorize-Names-and-Faces">WikiHow</a
	><br />
	Or you can train yourself to memorize names and faces:
</p>
<div class="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-12">
	<a href="./find-names" class="block w-[200px]"><Button fullWidth>Find Names</Button></a>
	<div class="h-2 w-2" />
	<a href="./find-faces" class="block w-[200px]"><Button fullWidth>Find Faces</Button></a>
	<div class="h-2 w-2" />
	<a href="./settings" class="block w-[200px]"
		><Button fullWidth type="secondary">Customize</Button></a
	>
</div>
<div class="flex flex-wrap">
	{#each data as u}
		<div
			class="w-1/2 sm:w-1/3 md:w-1/5 xl:w-[14.285714%] 2xl:w-[10%] p-2 flex flex-col items-center"
		>
			<Photo src={u.profile.image_original} alt={u.profile.real_name} />
			<div class="text-center mt-2">
				{u.profile.real_name}
			</div>
			{#if u.profile.title}
				<div class="text-center font-light text-sm mt-1 text-gray-500">{u.profile.title}</div>
			{/if}
		</div>
	{/each}
</div>
