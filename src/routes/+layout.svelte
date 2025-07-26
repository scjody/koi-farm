<script>
	import '$lib/styles/commodore64.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { musicStore } from '$lib/stores/musicStore';
	import { get } from 'svelte/store';

	onMount(() => {
		if (!get(musicStore).isPlaying) {
			musicStore.play('/frostbyte-dreams.mp3');
		}
	});
</script>

<div class="c64-container">
	<div class="c64-screen">
		<slot />
	</div>
</div>
