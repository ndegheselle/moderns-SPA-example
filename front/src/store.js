import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const currentUser = writable(null);
export function IsConnected() {
    console.log("user in store : ", get(currentUser));
    return !!get(currentUser);
}