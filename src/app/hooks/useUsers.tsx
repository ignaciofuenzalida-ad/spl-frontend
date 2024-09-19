'use client';
import { useState, useEffect, useCallback } from 'react';
import { searchUsers } from '../actions/search';
import { userDetail } from '../actions/detail';

export interface User {
    run: string;
    firstName: string;
    lastName: string;
    gender: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface UserDetail extends User {
    email: string;
    phoneNumber: string;
    homeAddress: string;
    city: string;
    birthDate: string;
    expirationDate: string;
    planType: string;
    emergencyName: string;
    emergencyNumber: string;
    maritalStatus: string;
    locations: string[];
}

// Available locations
const locations = [
    { slug: 'default', value: 'Sede' },
    { slug: 'antofagasta-espacio-urbano', value: 'Antofagasta Espacio Urbano' },
    { slug: 'iquique', value: 'Iquique' },
    { slug: 'antofagasta-arauco', value: 'Antofagasta Arauco' },
    { slug: 'antofagasta-pac-fico', value: 'Antofagasta Pacífico' },
    { slug: 'antofagasta-angamos', value: 'Antofagasta Angamos' },
    { slug: 'calama', value: 'Calama' },
];

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<UserDetail | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(false);
        try {
            const response = await searchUsers(search, location);
            setUsers(response || []);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, [search, location]);

    const fetchUserDetail = useCallback(async (run: string) => {
        setIsLoading(true);
        setError(false);
        try {
            const response = await userDetail(run);
            setUser(response || []);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (search) {
            fetchUsers();
        }
    }, [search, location, fetchUsers]);

    return {
        error,
        isLoading,
        user,
        setUser,
        fetchUserDetail,
        users,
        search,
        setSearch,
        locations,
        location,
        setLocation,
    };
};

export default useUsers;
