import { Head, useForm, router } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';

const UserEdit = ({ user }: { user: User }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit User - ' + user.name,
            href: 'user.edit',
        },
    ];

    const inputRef = useRef<HTMLInputElement>(null);
    const { data, setData, errors, put } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/user/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={onSubmitHandle}
                    className="m-5 bg-sidebar p-10 sm:rounded-lg sm:p-8"
                >
                    <div className="mb-4">
                        <Label htmlFor="input-name">User Name</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-name"
                            type="text"
                            name="name"
                            value={data.name}
                            ref={inputRef}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-email">User Email</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-email"
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-password">User Password</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-password_confirmation">Confirm Password</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <div className="text-right">
                        <Button
                            className="m-3 p-3 font-bold transition-colors duration-300 hover:bg-emerald-200"
                            type="submit"
                        >
                            Update User
                        </Button>
                        <Button
                            className="m-3 p-3 font-bold transition-colors duration-300 hover:bg-red-300"
                            type="button"
                            onClick={() => router.visit('/user')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default UserEdit;
