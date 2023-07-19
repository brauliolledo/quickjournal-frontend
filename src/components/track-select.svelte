<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { TrackManager } from '../api/EntityManager';
	import type { Track } from '../models/EntityTypes';

	export let selectedTrackId: string | null = null;

	const tracks = createQuery<Track[]>({
		queryKey: [`tracks`],
		queryFn: () => TrackManager.getAll()
	});

	// Setup initial value
	if (selectedTrackId == null && $tracks?.data != null && $tracks?.data.length > 0) {
		selectedTrackId = $tracks.data[0].id;
	}

	$: selectedTrackInArray = $tracks.data?.find((t) => t.id === selectedTrackId) ?? null;
</script>

{#if $tracks?.data != null}
	<select
		class={`select ${selectedTrackInArray != null ? `text-white` : `text-black`}`}
		bind:value={selectedTrackId}
		style={`background-color: ${
			selectedTrackInArray != null ? selectedTrackInArray.colour : `white`
		}`}
	>
		{#each $tracks.data as track}
			<option style={`background-color: ${track.colour};`} value={track.id}>{track.name}</option>
		{/each}
	</select>
{/if}
