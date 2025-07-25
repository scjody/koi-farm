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
		<h1 class="c64-title c64-text">CHOOSE A FISH</h1>
		
		<div class="fish-display">
			<button 
				class="nav-button left" 
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
						
						<h2 class="fish-name c64-text">{currentFish.name}</h2>
						<p class="fish-description c64-text">{currentFish.description}</p>
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
				class="nav-button right" 
				on:click={nextFish}
				aria-label="Next fish"
			>
				&gt;
			</button>
		</div>
		
		<div class="controls">
			<button class="c64-button select-button" on:click={selectFish}>
				SELECT THIS FISH
			</button>
			<p class="instructions c64-text">
				USE ARROW KEYS TO BROWSE - PRESS ENTER TO SELECT
			</p>
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
		padding: 1rem;
		text-align: center;
	}

	.c64-title {
		font-size: 2em;
		margin: 1rem 0;
	}

	.fish-display {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		position: relative;
		padding: 1rem;
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

	.fish-image {
		width: 80%;
		height: auto;
		max-height: 300px;
		object-fit: contain;
		filter: 
			drop-shadow(0 0 10px rgba(0, 136, 255, 0.3))
			brightness(1.1)
			contrast(1.2);
		margin-bottom: 1rem;
	}

	.fish-name {
		font-size: 1.5em;
		margin: 0.5rem 0;
		text-transform: uppercase;
	}

	.fish-description {
		font-size: 1em;
		margin: 0.5rem 0 1rem;
		max-width: 400px;
		line-height: 1.4;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		max-width: 300px;
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
		border: 2px solid var(--c64-light-blue);
		color: var(--c64-light-blue);
		font-family: 'Sixtyfour', monospace;
		font-size: 2rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-button:hover {
		background-color: var(--c64-light-blue);
		color: var(--c64-blue);
		box-shadow: 0 0 10px rgba(0, 136, 255, 0.8);
	}

	.controls {
		margin-top: 1rem;
	}

	.select-button {
		font-size: 1em;
		padding: 0.8rem 2rem;
		margin-bottom: 1rem;
	}

	.instructions {
		font-size: 1em;
		opacity: 0.8;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.fish-display {
			gap: 1rem;
		}

		.nav-button {
			width: 2.5rem;
			height: 2.5rem;
			font-size: 1.5rem;
		}

		.fish-name {
			font-size: 1.2em;
		}

		.fish-description {
			font-size: 1em;
		}
	}

	@media (max-width: 480px) {
		.c64-title {
			font-size: 1.5em;
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
			left: 0.5rem;
		}

		.nav-button.right {
			right: 0.5rem;
		}

		.select-button {
			font-size: 1em;
			padding: 0.6rem 1.5rem;
		}
	}
</style>
