import { Head } from '@inertiajs/react';
import TableComponent from '@/components/TableComponent';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ITasks } from '@/types';

export default function ProjectShow({
    project,
    tasks,
    queryParams,
}: {
    project: {
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
            title: `Project: ${project.id}`,
            href: 'project.show',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project description" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <img
                        src={project.image_path && project.image_path.startsWith('http') ? project.image_path : `/${project.image_path}`}
                        alt="proj_img"
                        className="h-64 w-full object-cover"
                    />
                    <div className="inset-0 size-full stroke-neutral-900/20 p-4 dark:stroke-neutral-100/20">
                        <div className="mt-4 grid grid-cols-2 gap-1">
                            <div>
                                <div>
                                    <label className="text-lg font-bold">
                                        Project ID
                                    </label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Project name
                                    </label>
                                    <p className="mt-1">{project.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Project Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                'rounded px-2 py-2 font-bold text-white ' +
                                                PROJECT_STATUS_CLASS_MAP[
                                                    project.status
                                                ]
                                            }
                                        >
                                            {
                                                PROJECT_STATUS_TEXT_MAP[
                                                    project.status
                                                ]
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created BY
                                    </label>
                                    <p className="mt-1">
                                        {project.createdBy.name}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Due Date
                                    </label>
                                    <p className="mt-1">{project.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Created Date
                                    </label>
                                    <p className="mt-1">{project.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Updated BY
                                    </label>
                                    <p className="mt-1">
                                        {project.updatedBy.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-bold">
                                Project Description
                            </label>
                            <p className="mt-1">{project.description}</p>
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
