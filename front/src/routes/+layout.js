import { refresh } from "../services/auth.js";
import { currentUser } from '../store.js';

export const load = async () => {
    try {
        const user = await refresh();
        currentUser.set(user);
      } catch (error) {
        // No user found
      }
};

export const prerender = false;
export const ssr = false;