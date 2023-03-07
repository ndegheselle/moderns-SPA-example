import { writable, get } from 'svelte/store';

export const currentUser = writable(null);
export function IsConnected() {
    return !!get(currentUser);
}

export const alert = writable(null);

export const confirmModal = writable({
    title: "",
    message: "",
    yes: Function,
    no: Function
});