<script lang="ts">
	import { onMount } from 'svelte';
	import fishData from '$lib/data/fishes.json';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { selectFish as setSelectedFish } from '$lib/stores/gameState';
	import type { Fish } from '$lib/types/fish';
	
	let currentIndex = 0;
	let fishes: Fish[] = fishData.fishes;
	
	// Handle keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		switch(e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				previousFish();
				break;
			case 'ArrowRight':
				e.preventDefault();
				nextFish();
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				selectFish();
				break;
		}
	}
	
	function previousFish() {
		currentIndex = (currentIndex - 1 + fishes.length) % fishes.length;
	}
	
	function nextFish() {
		currentIndex = (currentIndex + 1) % fishes.length;
	}
	
	function selectFish() {
		// Store selected fish
		setSelectedFish(fishes[currentIndex]);
		// Navigate to game
		goto('/game');
	}
	
	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
	
	$: currentFish = fishes[currentIndex];
</script>

<main>
	<div class="c64-content">
		<h1 class="c64-title c64-text c64-cyan">CHOOSE A FISH</h1>
		
		<div class="fish-display">
			<button 
				class="nav-button left c64-cyan" 
				on:click={previousFish}
				aria-label="Previous fish"
			>
				&lt;
			</button>
			
			<div class="fish-card">
				{#key currentIndex}
					<div class="fish-info" in:fade={{duration: 300}}>
						<img 
							src="/{currentFish.image}" 
							alt="{currentFish.name}"
							class="fish-image"
						/>
						
						<div class="fish-text">
							<h2 class="fish-name c64-text c64-cyan">{currentFish.name}</h2>
							<p class="fish-description c64-text">{currentFish.description}</p>
						</div>
					</div>
				{/key}
				
				<div class="stats">
					<div class="stat">
						<span class="stat-label c64-text">CLEVERNESS:</span>
						<span class="stars">
							<span class="stars-on">{"*".repeat(currentFish.stats.cleverness)}</span><span class="stars-off">{"*".repeat(5 - currentFish.stats.cleverness)}</span>
						</span>
					</div>
					<div class="stat">
						<span class="stat-label c64-text">CHARM:</span>
						<span class="stars">
							<span class="stars-on">{"*".repeat(currentFish.stats.charm)}</span><span class="stars-off">{"*".repeat(5 - currentFish.stats.charm)}</span>
						</span>
					</div>
					<div class="stat">
						<span class="stat-label c64-text">CONSENT:</span>
						<span class="stars">
							<span class="stars-on">{"*".repeat(currentFish.stats.consent)}</span><span class="stars-off">{"*".repeat(5 - currentFish.stats.consent)}</span>
						</span>
					</div>
				</div>
			</div>
			
			<button 
				class="nav-button right c64-cyan" 
				on:click={nextFish}
				aria-label="Next fish"
			>
				&gt;
			</button>
		</div>
		
		<div class="controls">
		</div>
	</div>
</main>

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
		padding: 1em;
		text-align: center;
	}

	.c64-title {
		font-size: 1em;
		margin: 0.5em 0;
	}

	.fish-display {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 2em;
		position: relative;
		padding: 2em 0 0 0;
	}

	.fish-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 600px;
		width: 100%;
	}

	.fish-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.fish-text {
		width: 100%;
		text-align: center;
	}

	.fish-image {
		width: 80%;
		height: auto;
		max-height: 300px;
		object-fit: contain;
		filter: 
			drop-shadow(0 0 10px rgba(0, 136, 255, 0.3))
			brightness(1.1)
			contrast(1.2);
		margin-bottom: 0;
	}

	.fish-name {
		font-size: 1em;
		margin: 0 0 1em 0;
		text-transform: uppercase;
		text-align: center;
	}

	.fish-description {
		font-size: 1em;
		margin: 0 0 1em;
		width: 30ch;
		max-width: 30ch;
		line-height: 1;
		height: 4em;
		min-height: 4em;
		max-height: 4em;
		overflow: hidden;
		text-align: left;
		margin-left: auto;
		margin-right: auto;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 0;
		width: 100%;
		max-width: 300px;
		margin-left: 1ch;
		text-align: left;
	}

	.stat {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.stat-label {
		font-size: 1em;
	}

	.stars {
		font-family: 'Sixtyfour', monospace;
		font-size: 1em;
		letter-spacing: 0;
	}
	
	.stars-on {
		color: var(--c64-yellow);
	}
	
	.stars-off {
		color: var(--c64-dark-grey);
	}

	.nav-button {
		background: none;
		border: none;
		color: inherit;
		font-family: 'Sixtyfour', monospace;
		font-size: 1em;
		width: 1em;
		height: 1em;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		align-self: flex-start;
		margin-top: 13em;
	}

	.nav-button:hover {
		text-shadow: 0 0 10px rgba(170, 255, 238, 0.8);
	}

	.controls {
		display: none;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.fish-display {
			gap: 1em;
		}

		.nav-button {
			width: 1em;
			height: 1em;
			font-size: 1em;
		}

		.fish-name {
			font-size: 1em;
		}

		.fish-description {
			font-size: 1em;
		}
	}

	@media (max-width: 480px) {
		.c64-title {
			font-size: 1em;
		}

		.fish-display {
			flex-direction: column;
		}

		.nav-button {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}

			.nav-button.left {
				left: 0.5em;
			}

			.nav-button.right {
				right: 0.5em;
			}
		}

	.c64-cyan {
		color: var(--c64-cyan);
	}
</style>
