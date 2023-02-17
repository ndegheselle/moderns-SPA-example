import { IsConnected } from '../../store.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    if (!IsConnected()) throw redirect(307, '/login');
};