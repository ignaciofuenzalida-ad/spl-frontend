'use server';

import { UserDetail } from '../hooks/useUsers';

const API_URL = process.env.API_URL || 'http://192.168.0.18:30001/api';
const AUTH_TOKEN = process.env.AUTH_TOKEN || '-';

export const userDetail = async (run: string): Promise<UserDetail> => {
    const response = await fetch(`${API_URL}/users/${run.slice(0, -2)}`, {
        headers: {
            'X-Auth-Token': AUTH_TOKEN,
        },
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch user details');
    }

    const body = await response.json();
    return body.data;
};
