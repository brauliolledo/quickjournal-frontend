<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Entry } from '../models/Entry';
	import { EntryManager } from '../api/EntityManager';
	import { isNotTransient, type Transient } from '../api/EntityManagerTypings';
	import Skeleton from '../ui/skeleton.svelte';
	import dayjs from 'dayjs';

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
				<div class="card border-2 border-gray-200 m-1 bg-white">
					<div class="card-body p-4">
						{#if isNotTransient(entry)}
							<div class="text-sm text-gray-400 font-bold">
								{entry.createdAt.format('YYYY/MM/DD HH:mm')}
							</div>
						{/if}
						<div class="whitespace-pre-wrap">{entry.body}</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
