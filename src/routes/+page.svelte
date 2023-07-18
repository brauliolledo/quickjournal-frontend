<script lang="ts">
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import EntryComposer from '../components/entry-composer.svelte';
	import EntryList from '../components/entry-list.svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';

	// Set up dayjs extensions

	dayjs.extend(utc);
	dayjs.extend(timezone);

	// Set up our tanstack query client

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<div class="h-screen flex flex-col p-4 bg-gray-100">
		<div class="text-2xl mb-4 w-100">
			<div class="flex flex-row">
				<div class="font-bold">Quickjournal</div>
				<div class="text-gray-500">&nbsp;/&nbsp;</div>
				<div class="text-gray-500">Entries</div>
			</div>
		</div>

		<div class="flex flex-col flex-grow">
			<div class="flex-grow"><EntryList /></div>

			<div class="flex-grow-0 pt-6">
				<EntryComposer />
			</div>
		</div>
	</div>
</QueryClientProvider>
