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

export const contextMenu = writable({
    visible: false,
    position: {x: 0, y: 0},
    items: []
});