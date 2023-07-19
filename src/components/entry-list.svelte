<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { EntryManager } from '../api/EntityManager';
	import Skeleton from '../ui/skeleton.svelte';
	import EntryCard from './entry-card.svelte';
	import type { Transient } from '../api/EntityManagerTypings';
	import type { Entry } from '../models/EntityTypes';

	const myEntries = createQuery<(Entry | Transient<Entry>)[]>({
		queryKey: [`my-entries`],
		queryFn: () => EntryManager.getAll([`-CreatedAt`])
	});
</script>

<div class="w-full h-full relative">
	<div
		class="flex flex-col w-100 max-h-full overflow-y-auto absolute top-0 left-0 right-0 bottom-0"
	>
		{#if $myEntries.isLoading}
			<Skeleton cards={5} left={true} />
		{/if}
		{#if $myEntries.error != null}
			An error ocurred getting entries.
		{/if}
		{#if $myEntries?.data != null}
			{#each $myEntries?.data as entry}
				<EntryCard {entry} />
			{/each}
		{/if}
	</div>
</div>
