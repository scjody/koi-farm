<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

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
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 1000,
				easing: quintOut,
				css: t => `
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
</script>

<main>
	<div class="container">
		<h1 class="title">Happy Koi Farm</h1>
		
		<div class="koi-display">
			{#if currentKoi}
				{#key currentKoi}
					<img 
						src="/{currentKoi}" 
						alt="Beautiful koi fish" 
						class="koi-image"
						in:receive={{key: currentKoi}}
						out:send={{key: currentKoi}}
					/>
				{/key}
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(135deg, #87CEEB 0%, #98E4D6 50%, #B0E5D1 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 2rem;
		box-sizing: border-box;
	}

	.container {
		text-align: center;
		max-width: 800px;
		width: 100%;
	}

	.title {
		font-family: 'Pacifico', cursive;
		font-size: 4rem;
		color: #2c5aa0;
		margin-bottom: 3rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		line-height: 1.2;
	}

	.koi-display {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		position: relative;
	}

	.koi-image {
		width: 75vw;
		height: auto;
		max-height: 75vh;
		object-fit: contain;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
		position: absolute;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.title {
			font-size: 2.5rem;
			margin-bottom: 2rem;
		}

		.koi-display {
			min-height: 40vh;
		}
	}

	@media (max-width: 480px) {
		.title {
			font-size: 2rem;
		}

		.koi-display {
			min-height: 35vh;
		}
	}
</style>