'use server';

import { User } from '../hooks/useUsers';

const API_URL = process.env.API_URL || 'http://192.168.0.18:30001/api';
const AUTH_TOKEN = process.env.AUTH_TOKEN || '-';

export const searchUsers = async (search: string, location: string): Promise<User[]> => {
    const params = new URLSearchParams({
        limit: '20',
        ...(location && location !== 'default' && { locations: location }),
        ...(search && { search: search }),
    });

    const response = await fetch(`${API_URL}/users?${params}`, {
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
