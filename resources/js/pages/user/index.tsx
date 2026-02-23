import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { MyPagination } from '@/components/my-pagination';
import TableHeading from '@/components/TableHeading';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import type { BreadcrumbItem, User } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: 'user.index',
    },
];

const TABLE_FIELDS = [
    {key: 'id', label: 'ID', sortable: true},
    {key: 'name', label: 'Name', sortable: true},
    {key: 'email', label: 'Email', sortable: true},
    {key: 'created_at', label: 'Create Date', sortable: true},
    {key: 'actions', label: 'Actions', sortable: false},
];


export default function UserIndex({
    users,
    queryParams = null,
    success,
}: {
    users: {data: User[], meta: {links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]}};
    queryParams: { name?: string; status?: string } | null;
    success: string;
}) {

     const [params, setParams] = useState<Record<string, string>>(queryParams || {})

        useEffect(() => {
            router.get(`?${new URLSearchParams(params).toString()}`, {}, {preserveState: true, replace: true});
        }, [params])

        const searchFieldChanged = (name: "name" | "email", value: string) => {
            if(value && value !== 'all') {
                setParams(() => ({...params, [name]: value, page: '1'}))
            } else {
                setParams(prev => {
                    const newParams = {...prev}
                    delete newParams[name]
                    return newParams
                })
            }
        }

        const onKeyPress =(name: "name" | "email", e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key !== 'Enter') return;
            searchFieldChanged(name, e.currentTarget.value)
        }

        const sortChanged = (name: string) => {
            if(params.sort_field === name) {
                if(params.sort_direction === 'asc') {
                    setParams(prev => ({...prev, sort_direction: 'desc'}))
                } else {
                    const newParams = {...params}
                    delete newParams.sort_field
                    setParams(newParams)
                }
            } else {
                setParams(prev => ({...prev, sort_field: name, sort_direction: 'asc'}))
            }
        }

        const handleDelete = (id: number) => {
            if(!confirm('Are you sure you want to delete this user?')) return;
            router.delete(`/user/${id}`, {preserveState: true});
        }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end">
                    <Link
                        href="/user/create"
                        className="w-35 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
                    >
                        Add new
                    </Link>
                </div>
                {success && (
                    <div className="rounded bg-emerald-500 px-4 py-2 text-white">
                        {success}
                    </div>
                )}


                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700
                        border-b-2 border-gray-500'
                    >
                        <tr className='text-nowrap'>
                            {TABLE_FIELDS.map(field => (
                                <TableHeading key={field.key}
                                    sortable={field.sortable}
                                    sortChanged={() => sortChanged(field.key)}
                                    name={field.key}
                                    sort_field={params.sort_field}
                                >
                                    {field.label}
                                </TableHeading>
                            ))}
                        </tr>

                        <tr className='text-nowrap'>
                            <th className='p-3'></th>
                            <th className='p-3'>
                                <Input className='px-2 py-1' placeholder="Search by name"
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyUp={e => onKeyPress('name', e)}
                                    defaultValue={params.name}
                                />
                            </th>
                            <th className='p-3 min-w-40'>
                                <Input className='px-2 py-1' placeholder="Search by email"
                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                    onKeyUp={e => onKeyPress('email', e)}
                                    defaultValue={params.email}
                                />
                            </th>
                            <th className='p-3'></th>
                            <th className='p-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map(item => (
                            <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[12px] sm:text-sm'>
                                <td className='px-3 py-2'>{item.id}</td>
                                <td className='px-3 py-2'>
                                    {item.name}
                                </td>
                                <td className='px-3 py-2'>
                                    {item.email}
                                </td>
                                <td className='px-3 py-2 text-nowrap'>{item.created_at}</td>
                                <td className='px-3 py-2'>
                                    <Link
                                        href={`/user/${item.id}/edit`}
                                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <MyPagination links={users.meta.links}/>

            </div>
        </AppLayout>
    );
}
