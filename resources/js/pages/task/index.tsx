import { Head } from '@inertiajs/react';
import TableComponent from '@/components/TableComponent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ITasks } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: 'task.index',
    },
];

export default function TaskIndex({
    tasks,
    queryParams,
}: {
    tasks: ITasks;
    queryParams: { name?: string; status?: string } | null;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableComponent items={tasks} queryParams={queryParams} />
            </div>
        </AppLayout>
    );
}
