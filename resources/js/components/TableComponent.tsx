import { Link, router } from '@inertiajs/react';

import { useCallback, useEffect, useState, memo } from 'react';
import { MyPagination } from '@/components/my-pagination';
import TableHeading from '@/components/TableHeading';

import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';

import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import type { ITasks, IProjects } from '@/types';

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

export default memo(function TableComponent({items, queryParams = null, tableType = 'task'}:
    {items: ITasks | IProjects, queryParams: {name?: string, status?: string} | null, tableType?: 'task' | 'project'}
) {


    const [params, setParams] = useState<Record<string, string>>(queryParams || {})

    useEffect(() => {
        router.get(`?${new URLSearchParams(params).toString()}`, {}, {preserveState: true, replace: true});
    }, [params])

    const searchFieldChanged = (name: "name" | "status", value: string) => {
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

    const onKeyPress =(name: "name" | "status", e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <>
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
                    {items.data.map(item => (
                        <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[12px] sm:text-sm'>
                            <td className='px-3 py-2'>{item.id}</td>
                            <td className='px-3 py-2'>
                                <img className='bg-amber-200 rounded-xl'
                                src={item.image_path} alt="" />
                            </td>
                            <td className='px-3 py-2 text-nowrap hover:underline font-bold'>
                                {tableType === 'project' ? (
                                     <Link href={`/project/${item.id}`}>
                                        {item.name}
                                    </Link>
                                ) : item.name}
                            </td>
                            <td className='px-3 py-2'>
                                <span className={
                                    "px-2 py-2 rounded text-white font-bold " +
                                    (tableType === 'task' ? TASK_STATUS_CLASS_MAP[item.status] : PROJECT_STATUS_CLASS_MAP[item.status])
                                }>
                                    {tableType === 'task' ? TASK_STATUS_TEXT_MAP[item.status] : PROJECT_STATUS_TEXT_MAP[item.status]}
                                </span>
                            </td>
                            <td className='px-3 py-2 text-nowrap'>{item.created_at}</td>
                            <td className='px-3 py-2 text-nowrap'>{item.due_date}</td>
                            <td className='px-3 py-2'>{item.createdBy.name}</td>
                            <td className='px-3 py-2'>
                                <Link
                                    href={`${tableType}.edit/${item.id}`}
                                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`${tableType}.destroy/${item.id}`}
                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <MyPagination links={items.meta.links}/>

        </>
    )
})
