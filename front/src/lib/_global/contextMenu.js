import { contextMenu } from "./store.js";

export const context = {
    show(position, items) {
        contextMenu.update((c) => {
            c.visible = true;
            c.position = position;
            c.items = items;
            return c;
        });
    }
};