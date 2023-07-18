<script lang="ts">
	export let rows = 0;
	export let cards = 0;
	export let left = false;
</script>

<div role="status" class="w-max-100 animate-pulse h-100">
	{#each { length: rows } as _, i}
		<div
			class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"
			style={`width: ${Math.floor(Math.random() * (100 - 40 + 1)) + 40}%`}
		/>
	{/each}
	{#each { length: cards } as _, i}
		<div
			class={`bg-gray-200 dark:bg-gray-700 mb-4 card ${left ? `ml-auto` : ``}`}
			style={`width: ${Math.floor(Math.random() * (100 - 70 + 1)) + 70}%; height: ${
				Math.floor(Math.random() * (200 - 70 + 1)) + 70
			}px`}
		/>
	{/each}
	<span class="sr-only">Loading...</span>
</div>
