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

		// Start background music
		const audio = new Audio('/frostbyte-dreams.mp3');
		audio.loop = true;
		audio.volume = 0.3; // Set to 30% volume
		
		// Auto-play with user interaction handling
		const playAudio = () => {
			audio.play().catch(e => console.log('Audio autoplay prevented:', e));
		};
		
		// Try to play immediately
		playAudio();
		
		// Also play on first user interaction
		const handleFirstInteraction = () => {
			playAudio();
			document.removeEventListener('click', handleFirstInteraction);
			document.removeEventListener('keydown', handleFirstInteraction);
		};
		
		document.addEventListener('click', handleFirstInteraction);
		document.addEventListener('keydown', handleFirstInteraction);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
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
						in:receive={{key: currentKoi}}
						out:send={{key: currentKoi}}
					/>
				{/key}
			{/if}
		</div>

		<div class="insert-coin c64-text c64-flash">INSERT COIN</div>
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
		justify-content: space-between;
		padding: 2rem;
	}

	.koi-display {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		position: relative;
		padding: 2rem 0;
	}

	.koi-image {
		width: 80% !important;
		height: auto !important;
		max-height: 80% !important;
		object-fit: contain;
		filter: 
			drop-shadow(0 0 10px rgba(0, 136, 255, 0.3))
			brightness(1.1)
			contrast(1.2);
		position: absolute;
		image-rendering: auto;
	}

	.insert-coin {
		font-size: 1.2rem;
		margin-top: auto;
		padding-bottom: 1rem;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.c64-content {
			padding: 1rem;
		}

		.koi-image {
			width: 85% !important;
			max-height: 70% !important;
		}
	}

	@media (max-width: 480px) {
		.c64-content {
			padding: 0.5rem;
		}

		.koi-image {
			width: 90% !important;
			max-height: 65% !important;
		}

		.insert-coin {
			font-size: 1rem;
		}
	}
</style>
