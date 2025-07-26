<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	// List of all koi fish images
	const koiImages = [
		'black-white-striped-koi.png',
		'dark-bronze-golden-koi.png',
		'golden-yellow-white-koi.png',
		'orange-white-koi.png',
		'red-orange-golden-koi.png',
		'silver-red-cap-koi.png',
		'white-orange-spotted-koi.png'
	];

	let currentKoi = '';
	let intervalId: number;

	// Create crossfade transition
	const [send, receive] = crossfade({
		duration: 1000,
		easing: quintOut,
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 1000,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function getRandomKoi(): string {
		const randomIndex = Math.floor(Math.random() * koiImages.length);
		return koiImages[randomIndex];
	}

	function changeKoi() {
		// Ensure we get a different koi than the current one
		let newKoi = getRandomKoi();
		while (newKoi === currentKoi && koiImages.length > 1) {
			newKoi = getRandomKoi();
		}
		currentKoi = newKoi;
	}

	onMount(() => {
		// Set initial koi
		currentKoi = getRandomKoi();

		// Change koi every 5 seconds
		intervalId = setInterval(changeKoi, 5000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	function handleInsertCoin() {
		goto('/choose-fish');
	}
</script>

<main>
	<div class="c64-content">
		<h1 class="c64-title c64-text c64-title-custom">Happy Koi Farm</h1>

		<div class="koi-display">
			{#if currentKoi}
				{#key currentKoi}
					<img
						src="/{currentKoi}"
						alt="Beautiful koi fish"
						class="koi-image"
						in:receive={{ key: currentKoi }}
						out:send={{ key: currentKoi }}
					/>
				{/key}
			{/if}
		</div>

		<button
			class="insert-coin c64-text"
			on:click={handleInsertCoin}
			aria-label="Insert coin to start"
		>
			<span class="c64-flash">INSERT COIN</span>
		</button>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.c64-content {
		text-align: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.c64-title {
		margin: 1rem 0;
	}

	.koi-display {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1 1 auto;
		position: relative;
		width: 100%;
		min-height: 0;
		overflow: hidden;
		padding: 0.5rem;
	}

	.koi-image {
		width: 80%;
		height: auto;
		max-width: 80%;
		max-height: 80%;
		object-fit: contain;
		filter: drop-shadow(0 0 10px rgba(0, 136, 255, 0.3)) brightness(1.1) contrast(1.2);
		position: absolute;
		image-rendering: auto;
	}

	.insert-coin {
		font-size: 1em;
		margin: 1rem 0;
		background: none;
		border: 2px solid var(--c64-light-blue);
		cursor: pointer;
		padding: 0.5rem 1rem;
		transition: all 0.2s ease;
	}

	.insert-coin:hover {
		background-color: var(--c64-cyan);
		color: var(--c64-blue);
	}

	.insert-coin:hover .c64-flash {
		animation: none;
		opacity: 1;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.c64-content {
			padding: 1rem;
		}

		.koi-display {
			padding: 1rem 0;
		}
	}

	@media (max-width: 480px) {
		.c64-content {
			padding: 0.5rem;
		}

		.koi-display {
			padding: 0.5rem 0;
		}

		.insert-coin {
			font-size: 1em;
		}
	}
</style>
