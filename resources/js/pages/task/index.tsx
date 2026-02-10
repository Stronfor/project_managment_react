import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { MyPagination } from '@/components/my-pagination';
import TableHeading from '@/components/TableHeading';

import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: 'task.index',
    },
];

const TABLE_FIELDS = [
    {key: 'id', label: 'ID', sortable: true},
    {key: 'image', label: 'Image', sortable: false},
    {key: 'name', label: 'Name', sortable: true},
    {key: 'status', label: 'Status', sortable: true},
    {key: 'created_at', label: 'Create Date', sortable: true},
    {key: 'due_date', label: 'Due Date', sortable: true},
    {key: 'created_by', label: 'Created By', sortable: false},
    {key: 'actions', label: 'Actions', sortable: false},
];

interface ILinks {
    first: string
    last: string
    next: string | null
    prev: string | null
}

interface IUserBy {
    name: string
    email: string
    id: number
}

interface ITasks {
    data: {
        id: number
        name: string
        description: string
        created_at: string
        due_date: string
        status: "completed" | "in_progress" | "pending"
        image_path: string
        createdBy: IUserBy
        updatedBy: IUserBy
    }[]
    meta: {links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]}
    links: ILinks
}

export default function TaskIndex({tasks, queryParams = null}: {tasks: ITasks, queryParams: {name?: string, status?: string} | null}) {

    //queryParams = queryParams || {};

    const [params, setParams] = useState<Record<string, string>>(queryParams || {})

    console.log(params);


    useEffect(() => {
        router.get(`task?${new URLSearchParams(params).toString()}`, {}, {preserveState: true, replace: true});
    }, [params])

    const searchFieldChanged = (name: "name" | "status", value: string) => {
        if(value && value !== 'all') {
            setParams(() => ({...params, [name]: value}))
        } else {
            setParams(prev => {
                const newParams = {...prev}
                delete newParams[name]
                return newParams
            })
        }
    }

    const onKeyPress = (name: "name" | "status", e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name, e.currentTarget.value)
    }

    const sortChanged = useCallback((name: string) => {
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
    }, [params])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 ">

                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700
                        border-b-2 border-gray-500'
                    >
                        <tr className='text-nowrap'>
                            {TABLE_FIELDS.map(field => (
                                <TableHeading key={field.key} sortable={field.sortable} sortChanged={() => sortChanged(field.key)} name={field.key} sort_field={params.sort_field}>
                                    {field.label}
                                </TableHeading>
                            ))}
                        </tr>

                        <tr className='text-nowrap'>
                            <th className='p-3'></th>
                            <th className='p-3'></th>
                            <th className='p-3'>
                                <Input className='px-2 py-1' placeholder="Search by name"
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyUp={e => onKeyPress('name', e)}
                                    defaultValue={params.name}
                                />
                            </th>
                            <th className='p-3 min-w-40'>
                                <Select onValueChange={value => searchFieldChanged('status', value)}
                                    defaultValue={params.status}>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </th>
                            <th className='p-3'></th>
                            <th className='p-3'></th>
                            <th className='p-3'></th>
                            <th className='p-3 text-right'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(task => (
                            <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[12px] sm:text-sm'>
                                <td className='px-3 py-2'>{task.id}</td>
                                <td className='px-3 py-2'>
                                    <img className='bg-amber-200 rounded-xl'/*  */
                                    /* src={`http://picsum.photos/seed/${task.id}/80`}  */src={task.image_path} alt="" />
                                </td>
                                <td className='px-3 py-2'>{task.name}</td>
                                <td className='px-3 py-2'>
                                    <span className={
                                        "px-2 py-2 rounded text-white font-bold " +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
                                <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                                <td className='px-3 py-2'>{task.createdBy.name}</td>
                                <td className='px-3 py-2'>
                                    <Link
                                        href={`task.edit/${task.id}`}
                                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`task.destroy/${task.id}`}
                                        className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <MyPagination links={tasks.meta.links}/>

            </div>
        </AppLayout>
    );
}
