<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import type { Entry } from '../models/Entry';
	import { EntryManager } from '../api/EntityManager';
	import type { Transient } from '../api/EntityManagerTypings';

	let entryBody: string = ``;
	// TODO: OPTIMISTIC UPDATES

	const client = useQueryClient();

	const createEntryMutation = createMutation<Entry, Error, Transient<Entry>>({
		mutationFn: (newEntry) => EntryManager.create(newEntry),
		onMutate: async (newEntry) => {
			entryBody = ``;

			// Optimistically update the my-entries list
			// TODO: abstract this?

			await client.cancelQueries({ queryKey: [`my-entries `] });

			const existingEntries = client.getQueryData<Entry[]>([`my-entries`]) ?? [];

			if (newEntry != null) {
				client.setQueryData<(Entry | Transient<Entry>)[]>(
					[`my-entries`],
					[newEntry, ...existingEntries]
				);
			}
		},
		onSettled: () => {
			client.invalidateQueries({
				queryKey: [`my-entries`]
			});
		}
	});
</script>

<div class="flex flex-row self-end w-full h-12">
	<textarea
		bind:value={entryBody}
		class="textarea textarea-bordered flex-grow"
		placeholder="Start by writing an entry..."
		on:keydown={(event) => {
			console.log(event);
			if (event.key == `Enter` && !event.shiftKey && !event.ctrlKey) {
				event.preventDefault();

				$createEntryMutation.mutate({
					body: entryBody,
					important: false
				});
			}
		}}
	/>
	<button
		class="btn btn-primary ml-4"
		on:click={() =>
			$createEntryMutation.mutate({
				body: entryBody,
				important: false
			})}>ADD</button
	>
</div>
