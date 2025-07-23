import { browser } from '$app/environment';

/**
 * Type-safe localStorage utilities
 */
export class LocalStorage {
	/**
	 * Get item from localStorage with type safety
	 */
	static get<T>(key: string, defaultValue: T): T {
		if (!browser) return defaultValue;

		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.warn(`Failed to parse localStorage item "${key}":`, error);
			return defaultValue;
		}
	}

	/**
	 * Set item in localStorage
	 */
	static set<T>(key: string, value: T): void {
		if (!browser) return;

		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Failed to set localStorage item "${key}":`, error);
		}
	}

	/**
	 * Remove item from localStorage
	 */
	static remove(key: string): void {
		if (!browser) return;
		localStorage.removeItem(key);
	}

	/**
	 * Clear all localStorage
	 */
	static clear(): void {
		if (!browser) return;
		localStorage.clear();
	}

	/**
	 * Check if key exists in localStorage
	 */
	static has(key: string): boolean {
		if (!browser) return false;
		return localStorage.getItem(key) !== null;
	}

	/**
	 * Get all keys from localStorage
	 */
	static keys(): string[] {
		if (!browser) return [];
		return Object.keys(localStorage);
	}
}

/**
 * Session storage utilities (similar API to localStorage but for session)
 */
export class SessionStorage {
	static get<T>(key: string, defaultValue: T): T {
		if (!browser) return defaultValue;

		try {
			const item = sessionStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.warn(`Failed to parse sessionStorage item "${key}":`, error);
			return defaultValue;
		}
	}

	static set<T>(key: string, value: T): void {
		if (!browser) return;

		try {
			sessionStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Failed to set sessionStorage item "${key}":`, error);
		}
	}

	static remove(key: string): void {
		if (!browser) return;
		sessionStorage.removeItem(key);
	}

	static clear(): void {
		if (!browser) return;
		sessionStorage.clear();
	}

	static has(key: string): boolean {
		if (!browser) return false;
		return sessionStorage.getItem(key) !== null;
	}

	static keys(): string[] {
		if (!browser) return [];
		return Object.keys(sessionStorage);
	}
}