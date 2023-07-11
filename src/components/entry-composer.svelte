<script lang="ts">
	import EntryManager from '../api/EntryManager';

	let entryBody: string = ``;

	const handleAddEntry = () => {
		EntryManager.createEntry({
			body: entryBody
		});
	};
</script>

<div class="flex flex-row self-end w-full h-12 m-4">
	<textarea
		bind:value={entryBody}
		class="textarea textarea-bordered flex-grow"
		placeholder="Start by writing an entry..."
	/>
	<button class="btn btn-primary ml-4" on:click={handleAddEntry}>ADD</button>
</div>
