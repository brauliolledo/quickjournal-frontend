<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { isNotTransient, type ForUpdating, type Transient } from '../api/EntityManagerTypings';
	import type { Entry } from '../models/Entry';
	import { EntryManager } from '../api/EntityManager';

	export let entry: Entry | Transient<Entry>;

	const client = useQueryClient();

	const updateEntryMutation = createMutation({
		mutationFn: (updatedEntry: ForUpdating<Entry>) => EntryManager.update(updatedEntry),
		onMutate: () => {
			// TODO: optimistc update ui
		},
		onSettled: () => {
			client.invalidateQueries({
				queryKey: [`my-entries`]
			});
		}
	});
</script>

<div class="card border-2 border-gray-200 m-1 bg-white">
	<div class="card-body p-4 relative">
		{#if isNotTransient(entry)}
			<div class="text-sm text-gray-400 font-bold">
				{entry.createdAt.format('YYYY/MM/DD HH:mm')}
			</div>
			<div
				class={`toolbar absolute top-2 right-2 cursor-pointer ${
					entry.important ? `opacity-100` : `opacity-20`
				} hover:opacity-100 select-none`}
				on:click={() =>
					isNotTransient(entry) &&
					$updateEntryMutation.mutate({
						...entry,
						important: !entry.important
					})}
			>
				⭐
			</div>
		{/if}
		<div class="whitespace-pre-wrap">{entry.body}</div>
	</div>
</div>
