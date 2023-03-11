import { writable, get } from 'svelte/store';

export const currentUser = writable(null);
export function IsConnected() {
    return !!get(currentUser);
}

export const alert = writable(null);

export const confirmModal = writable({
    show: false,
    title: "",
    message: "",
    type: "",
    callback: Function,
});