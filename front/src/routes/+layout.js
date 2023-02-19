import { refresh } from "../services/auth.js";
import { currentUser, IsConnected } from '../store.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ route }) => {
  if (route.id == "/login") return;

  try {
    const user = await refresh();
    currentUser.set(user);
  } catch (error) {
    throw redirect(302, '/login');
  }
  
  if (!IsConnected()) throw redirect(302, '/login');
};

export const prerender = false;
export const ssr = false;