'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import useUsers from './hooks/useUsers';
import { useEffect, useState } from 'react';
import { capitalize } from '../utils/capitalize';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

export default function Component() {
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const {
        error,
        isLoading,
        users,
        setSearch,
        locations,
        location,
        setLocation,
        user,
        setUser,
        fetchUserDetail,
    } = useUsers();

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(debouncedSearch);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedSearch, setSearch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sportlife Users</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input
                    type="text"
                    name="search"
                    placeholder="Busqueda por nombre"
                    value={debouncedSearch}
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    className="flex-grow"
                />
                <Select name="location" value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem key={location.slug} value={location.slug}>
                                {location.value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {isLoading && <p className="text-center">Loading..</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((person) => (
                    <Card
                        key={person.run}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => fetchUserDetail(person.run)}
                    >
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <h2 className="font-semibold">
                                {capitalize(`${person.firstName} ${person.lastName}`)}
                            </h2>
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">RUT: {person.run}</p>
                                <p className="text-sm text-gray-500">Gender: {person.gender}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {users.length === 0 && !isLoading && (
                <p className="text-center text-gray-500 mt-4">No results</p>
            )}

            <Dialog open={!!user} onOpenChange={() => setUser(undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {user?.firstName} {user?.lastName}
                        </DialogTitle>
                        <DialogDescription>User Details</DialogDescription>
                    </DialogHeader>
                    {user && (
                        <div className="mt-4">
                            <p>
                                <strong>RUT:</strong> {user.run}
                            </p>
                            <p>
                                <strong>Correo:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Celular:</strong> {user.phoneNumber}
                            </p>
                            <p>
                                <strong>Genero:</strong> {user.gender}
                            </p>
                            <p>
                                <strong>Ciudad:</strong> {user.city}
                            </p>
                            <p>
                                <strong>Direccion:</strong> {user.homeAddress}
                            </p>
                            <p>
                                <strong>Nacimiento:</strong>{' '}
                                {new Date(user.birthDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Fecha de expiracion:</strong>{' '}
                                {new Date(user.expirationDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Plan:</strong> {user.planType || 'Sin plan'}
                            </p>
                            <p>
                                <strong>Nombre de emergencia:</strong> {user.emergencyName}
                            </p>
                            <p>
                                <strong>Numero de emergencia:</strong> {user.emergencyNumber}
                            </p>
                            <p>
                                <strong>Estado civil:</strong> {user.maritalStatus}
                            </p>
                            <p>
                                <strong>Sedes:</strong> {user.locations?.join(', ') ?? 'N/A'}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
