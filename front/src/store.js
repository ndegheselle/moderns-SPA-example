import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const currentUser = writable(null);
export function IsConnected() {
    return !!get(currentUser);
}