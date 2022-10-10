<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import { removeData, loadData, saveData } from '$lib/storage';
	import { onMount } from 'svelte';

	let dataStr: string;
	onMount(() => {
		const data = loadData();
		dataStr = JSON.stringify(data, null, 2);
		console.log(dataStr);
	});
	function handleSave() {
		try {
			saveData(dataStr);
			goto('../');
		} catch (err) {
			window.alert(`Invalid data\n\n${(err as Error).message}`);
		}
	}
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Upload your own names & photos" />
</svelte:head>

<textarea
	id="message"
	rows="20"
	class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
	placeholder="Copy json profiles from slack"
	on:change={(e) => (dataStr = e.currentTarget.value)}>{dataStr}</textarea
>
<div class="h-2" />
<div class="flex justify-between">
	<a href="../"><Button type="secondary">Back</Button></a>
	<div class="flex">
		<Button
			type="secondary"
			on:click={() => {
				removeData();
				dataStr = '';
			}}>Clear</Button
		>
		<div class="w-2" />
		<Button on:click={handleSave}>Save</Button>
	</div>
</div>

<p class="mt-4">Here you can use your own data from your Slack organization(s). How:</p>
<ol class="pl-5 my-2 space-y-1 list-decimal list-inside">
	<li>Open Slack in Google Chrome</li>
	<li>Right click > Inspect</li>
	<li>Click Network</li>
	<li>Type "users/list" on the Filter</li>
	<li>Refresh the page (F5 or CTRL+R or CMD+R</li>
	<li>Click on the filtered item, go to Preview tab</li>
	<li>Right click on the "results" > Copy value, paste here and press Save</li>
</ol>
<img src="./slack-user-list-guide.webp" alt="Slack user list guide" />
