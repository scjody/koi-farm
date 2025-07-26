import { writable } from 'svelte/store';
import type { Fish } from '$lib/types/fish';

interface GameState {
	selectedFish: Fish | null;
	coins: number;
	level: number;
}

const initialState: GameState = {
	selectedFish: null,
	coins: 0,
	level: 1
};

export const gameState = writable<GameState>(initialState);

export function selectFish(fish: Fish) {
	gameState.update((state) => ({
		...state,
		selectedFish: fish
	}));
}

export function insertCoin() {
	gameState.update((state) => ({
		...state,
		coins: state.coins + 1
	}));
}
