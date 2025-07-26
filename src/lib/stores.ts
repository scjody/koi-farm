import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Serializable =
	| string
	| number
	| boolean
	| null
	| Serializable[]
	| { [key: string]: Serializable };

/**
 * Creates a writable store that syncs with localStorage
 * @param key - localStorage key
 * @param defaultValue - default value if localStorage is empty
 */
export function localStorageStore<T extends Serializable>(key: string, defaultValue: T) {
	const store = writable<T>(defaultValue);

	// Load from localStorage on initialization
	if (browser) {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				store.set(JSON.parse(stored));
			} catch (e) {
				console.warn(`Failed to parse localStorage value for key "${key}":`, e);
				store.set(defaultValue);
			}
		}
	}

	// Subscribe to store changes and update localStorage
	const { subscribe, set, update } = store;

	return {
		subscribe,
		set: (value: T) => {
			if (browser) {
				localStorage.setItem(key, JSON.stringify(value));
			}
			set(value);
		},
		update: (updater: (value: T) => T) => {
			update((currentValue) => {
				const newValue = updater(currentValue);
				if (browser) {
					localStorage.setItem(key, JSON.stringify(newValue));
				}
				return newValue;
			});
		},
		clear: () => {
			if (browser) {
				localStorage.removeItem(key);
			}
			set(defaultValue);
		}
	};
}

/**
 * Creates a store for managing user preferences
 */
export function createPreferencesStore() {
	interface Preferences {
		theme: 'light' | 'dark' | 'auto';
		language: string;
	}

	const defaultPreferences: Preferences = {
		theme: 'auto',
		language: 'en'
	};

	return localStorageStore('user-preferences', defaultPreferences);
}

/**
 * Creates a store for managing application state
 */
export function createAppStateStore() {
	interface AppState {
		isInitialized: boolean;
		currentView: string;
		lastUpdated: number;
	}

	const defaultState: AppState = {
		isInitialized: false,
		currentView: 'home',
		lastUpdated: Date.now()
	};

	return localStorageStore('app-state', defaultState);
}

// Export store instances
export const preferences = createPreferencesStore();
export const appState = createAppStateStore();
