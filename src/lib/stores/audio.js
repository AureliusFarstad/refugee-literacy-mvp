import { writable } from 'svelte/store';

export const audio_src = writable('');
export const audio_paused = writable(false);