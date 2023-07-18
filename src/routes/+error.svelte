<script>
	import { page } from '$app/stores';
</script>

<div
	style="height: 100vh; display:flex; flex-direction: column; align-items: center; padding-top: 10px;"
>
	<strong>Something went wrong</strong>
	<p>{$page?.error?.message ?? `Try again later`}</p>
</div>
