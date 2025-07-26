<script lang="ts">
	import { gameState } from '$lib/stores/gameState';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let selectedFish = null;

	onMount(() => {
		// Get the selected fish from the store
		const unsubscribe = gameState.subscribe((state) => {
			selectedFish = state.selectedFish;
			if (!selectedFish) {
				// If no fish selected, redirect to selection
				goto('/choose-fish');
			}
		});

		return unsubscribe;
	});
</script>

{#if selectedFish}
	<main>
		<div class="c64-content">
			<h1 class="c64-title c64-text">KOI FARM</h1>

			<div class="game-area">
				<div class="selected-fish">
					<img src="/{selectedFish.image}" alt={selectedFish.name} class="fish-image" />
					<p class="fish-name c64-text">{selectedFish.name}</p>
				</div>

				<div class="coming-soon c64-text c64-flash">GAME COMING SOON</div>
			</div>

			<button class="c64-button" on:click={() => goto('/')}>BACK TO HOME</button>
		</div>
	</main>
{/if}

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.c64-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem;
		text-align: center;
	}

	.c64-title {
		font-size: 2em;
		margin: 1rem 0;
	}

	.game-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.selected-fish {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.fish-image {
		width: 200px;
		height: auto;
		filter: drop-shadow(0 0 10px rgba(0, 136, 255, 0.3)) brightness(1.1) contrast(1.2);
	}

	.fish-name {
		font-size: 1em;
	}

	.coming-soon {
		font-size: 1.5em;
		margin: 2rem 0;
	}
</style>
