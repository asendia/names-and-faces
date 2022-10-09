<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width = '200';
</script>

<img class="object-cover w-[200px] h-[300px] rounded-md" {src} {alt} {width} />
