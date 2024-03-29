import { redirect } from '@sveltejs/kit';
import { currentUser, IsConnected } from '@global/store.js';
import { refresh } from "@global/api/auth.js";
import { init as initPopups } from "@global/popups.js"

// Check for each page is still connected
export const load = async ({ route }) => {
  initPopups();

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