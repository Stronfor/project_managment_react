import { Head, Link } from '@inertiajs/react';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: 'project.index',
    },
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

interface IProjects {
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
    meta: object
    links: ILinks
}

export default function ProjectIndex({projects}: {projects: IProjects}) {

console.log('projects ', projects);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700
                        border-b-2 border-gray-500'
                    >
                        <tr className='text-nowrap'>
                            <th className='p-3'>ID</th>
                            <th className='p-3'>Image</th>
                            <th className='p-3'>Name</th>
                            <th className='p-3'>Status</th>
                            <th className='p-3'>Create Date</th>
                            <th className='p-3'>Due Date</th>
                            <th className='p-3'>Created By</th>
                            <th className='p-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map(project => (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='px-3 py-2'>{project.id}</td>
                                <td className='px-3 py-2'>
                                    <img className='bg-amber-200 rounded-xl'/*  */
                                    /* src={`http://picsum.photos/seed/${project.id}/80`}  */src={project.image_path} alt="" />
                                </td>
                                <td className='px-3 py-2'>{project.name}</td>
                                <td className='px-3 py-2'>{project.status}</td>
                                <td className='px-3 py-2 text-nowrap'>{project.created_at}</td>
                                <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                <td className='px-3 py-2'>{project.createdBy.name}</td>
                                <td className='px-3 py-2'>
                                    <Link
                                        href={`project.edit/${project.id}`}
                                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                    >Edit</Link>
                                    <Link
                                        href={`project.destroy/${project.id}`}
                                        className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                    >Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </AppLayout>
    );
}
