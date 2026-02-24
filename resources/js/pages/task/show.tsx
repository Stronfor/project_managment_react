import { Head } from '@inertiajs/react';
import TableComponent from '@/components/TableComponent';
import { TASK_PRIORITY_CLASS_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ITask, ITasks } from '@/types';

export default function TaskShow({
    task,
    tasks,
    queryParams,
}: {
    task: ITask;
    tasks: ITasks;
    queryParams: { name?: string; status?: string } | null;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Task: ${task.id}`,
            href: 'task.show',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task description" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <img
                        src={
                            task.image_path &&
                            task.image_path.startsWith('http')
                                ? task.image_path
                                : `/${task.image_path}`
                        }
                        alt="proj_img"
                        className="h-64 w-full object-cover"
                    />
                    <div className="inset-0 size-full stroke-neutral-900/20 p-4 dark:stroke-neutral-100/20">
                        <div className="mt-4 grid grid-cols-2 gap-1">
                            <div>
                                <div>
                                    <label className="text-lg font-bold">
                                        Task ID
                                    </label>
                                    <p className="mt-1">{task.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Task name
                                    </label>
                                    <p className="mt-1">{task.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Task Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                'rounded px-2 py-2 font-bold text-white ' +
                                                TASK_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            }
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Task Priority
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                'rounded px-2 py-2 font-bold text-white ' +
                                                TASK_PRIORITY_CLASS_MAP[
                                                    task.priority?.toLowerCase() as "low" | "medium" | "high"
                                                ]
                                            }
                                        >
                                            {TASK_PRIORITY_TEXT_MAP[task.priority?.toLowerCase() as "low" | "medium" | "high"]}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created By
                                    </label>
                                    <p className="mt-1">
                                        {task.createdBy.name}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Assigned By
                                    </label>
                                    <p className="mt-1">
                                        {task.assignedUser?.name || 'Unassigned'}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Due Date
                                    </label>
                                    <p className="mt-1">{task.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created Date
                                    </label>
                                    <p className="mt-1">{task.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Updated By
                                    </label>
                                    <p className="mt-1">
                                        {task.updatedBy.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-bold">
                                Task Description
                            </label>
                            <p className="mt-1">{task.description}</p>
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
