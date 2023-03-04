import { writable, get } from 'svelte/store';

export const currentUser = writable(null);
export function IsConnected() {
    return !!get(currentUser);
}