<script lang="ts">
	export let type: 'primary' | 'secondary' = 'primary';
</script>

<button
	on:click
	class={`${
		type === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'
	} text-white font-bold py-2 px-4 rounded-full`}
>
	<slot />
</button>
