import { refresh } from "../lib/auth.js";
import { currentUser, IsConnected } from '../store.js';
import { redirect } from '@sveltejs/kit';

// Check for each page is still connected
export const load = async ({ route }) => {
  if (IsConnected() || route.id == "/login") return;

  try {
    const user = await refresh();
    currentUser.set(user);
  } catch (error) {
  }

  if (!IsConnected()) throw redirect(302, '/login');
};

export const prerender = false;
export const ssr = false;