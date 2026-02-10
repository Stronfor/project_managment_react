import { Head } from '@inertiajs/react';
import TableComponent from '@/components/TableComponent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, IProjects } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: 'project.index',
    },
];

export default function ProjectIndex({
    projects,
    queryParams = null,
}: {
    projects: IProjects;
    queryParams: { name?: string; status?: string } | null;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableComponent
                    items={projects}
                    queryParams={queryParams}
                    tableType="project"
                />
            </div>
        </AppLayout>
    );
}
