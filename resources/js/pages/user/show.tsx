import { Head } from '@inertiajs/react';
import TableComponent from '@/components/TableComponent';
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ITasks } from '@/types';

export default function UserShow({
    user,
    tasks,
    queryParams,
}: {
    user: {
        id: number;
        name: string;
        description: string;
        created_at: string;
        due_date: string;
        status: 'completed' | 'in_progress' | 'pending';
        image_path: string;
        createdBy: {
            name: string;
            email: string;
            id: number;
        };
        updatedBy: {
            name: string;
            email: string;
            id: number;
        };
    };
    tasks: ITasks;
    queryParams: { name?: string; status?: string } | null;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `User: ${user.id}`,
            href: 'user.show',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User description" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <img
                        src={
                            user.image_path &&
                            user.image_path.startsWith('http')
                                ? user.image_path
                                : `/${user.image_path}`
                        }
                        alt="proj_img"
                        className="h-64 w-full object-cover"
                    />
                    <div className="inset-0 size-full stroke-neutral-900/20 p-4 dark:stroke-neutral-100/20">
                        <div className="mt-4 grid grid-cols-2 gap-1">
                            <div>
                                <div>
                                    <label className="text-lg font-bold">
                                        User ID
                                    </label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        User name
                                    </label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        User Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                'rounded px-2 py-2 font-bold text-white ' +
                                                USER_STATUS_CLASS_MAP[
                                                    user.status
                                                ]
                                            }
                                        >
                                            {USER_STATUS_TEXT_MAP[user.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created BY
                                    </label>
                                    <p className="mt-1">
                                        {user.createdBy.name}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Due Date
                                    </label>
                                    <p className="mt-1">{user.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created Date
                                    </label>
                                    <p className="mt-1">{user.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Updated BY
                                    </label>
                                    <p className="mt-1">
                                        {user.updatedBy.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-bold">
                                User Description
                            </label>
                            <p className="mt-1">{user.description}</p>
                        </div>

                        <div className="mt-4">
                            <TableComponent
                                items={tasks}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
