import { refresh } from "../services/auth.js";
import { currentUser } from '../store.js';

export const load = async () => {
    currentUser.set(refresh());
};

export const prerender = false;
export const ssr = false;