<script lang="ts">
	export let title: string = 'Example Component';
	export let count: number = 0;

	function increment() {
		count += 1;
	}

	function decrement() {
		count -= 1;
	}
</script>

<div class="component">
	<h3>{title}</h3>
	<div class="counter">
		<button on:click={decrement}>-</button>
		<span class="count">{count}</span>
		<button on:click={increment}>+</button>
	</div>
	<slot />
</div>

<style>
	.component {
		padding: 1rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background: #f9f9f9;
	}

	.counter {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1rem 0;
	}

	.count {
		font-size: 1.5rem;
		font-weight: bold;
		min-width: 2rem;
		text-align: center;
	}

	button {
		width: 2rem;
		height: 2rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:hover {
		background: #f0f0f0;
	}
</style>
