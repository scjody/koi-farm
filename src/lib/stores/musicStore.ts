import { writable } from 'svelte/store';

const createAudioStore = () => {
	const { subscribe, set, update } = writable({
		isPlaying: false,
		audio: null as HTMLAudioElement | null
	});

	const play = (src: string) => {
		update((state) => {
			if (state.audio) {
				return state;
			}
			const audio = new Audio(src);
			audio.loop = true;
			audio.play();
			return { isPlaying: true, audio };
		});
	};

	const stop = () => {
		update((state) => {
			if (state.audio) {
				state.audio.pause();
			}
			return { isPlaying: false, audio: null };
		});
	};

	const restart = () => {
		update((state) => {
			if (state.audio) {
				state.audio.currentTime = 0;
				state.audio.play();
			}
			return state;
		});
	};

	return {
		subscribe,
		play,
		stop,
		restart
	};
};

export const musicStore = createAudioStore();
