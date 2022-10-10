<script lang="ts">
	export let type: 'primary' | 'secondary' = 'primary';
	export let fullWidth = false;
</script>

<button
	on:click
	class={`${
		type === 'primary'
			? 'bg-blue-500 hover:bg-blue-700 text-white'
			: 'bg-purple-200 hover:bg-purple-400 text-black'
	} ${fullWidth ? 'w-full' : ''} font-bold py-2 px-4 rounded-full`}
>
	<slot />
</button>
