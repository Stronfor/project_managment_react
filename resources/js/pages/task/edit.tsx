import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, IProject, ITask, User } from '@/types';

const TaskEdit = ({ task, projects, users }: { task: ITask, projects: {data: IProject[]}, users: {data: User[]} }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Task - ' + task.name,
            href: 'task.edit',
        },
    ];


    const { data, setData, errors, put } = useForm({
        image: null as File | null,
        name: task.name || '',
        status: task.status || 'pending',
        description: task.description || '',
        due_date: task.due_date || '',
        priority: task.priority || 'low',
        assigned_user_id: task.assignedUser?.id ? String(task.assignedUser.id) : '',
        project_id: String(task.project.id),

    });

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/task/${task.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={onSubmitHandle}
                    className="m-5 bg-sidebar p-10 sm:rounded-lg sm:p-8"
                >
                    {task.image_path && (
                        <div>
                            <img
                                src={
                                    task.image_path.startsWith('http')
                                        ? task.image_path
                                        : `/${task.image_path}`
                                }
                                alt="proj_img"
                                className="h-64 w-full object-cover"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <Label htmlFor="input-project_id">Project Name</Label>
                        <Select
                            onValueChange={(value) => setData('project_id', value)}
                            value={data.project_id}
                        >
                            <SelectTrigger
                                id="input-project_id"
                                className="mt-2 w-full"
                            >
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {projects.data.map((project) => (
                                        <SelectItem
                                            key={project.id}
                                            value={String(project.id)}
                                        >
                                            {`ID: ${project.id} -- ${project.name}`}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-img">Task Image</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-img"
                            type="file"
                            name="image"
                            onChange={(e) =>
                                e.target.files &&
                                setData('image', e.target.files[0])
                            }
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-name">Task Name</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="input-description">
                            Task Description
                        </Label>
                        <Textarea
                            className="mt-2 block w-full"
                            id="input-description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="input-status">Task Status</Label>
                        <Select
                            onValueChange={(value: "completed" | "in_progress" | "pending") => setData('status', value)}
                            value={data.status}
                        >
                            <SelectTrigger
                                id="input-status"
                                className="mt-2 w-full"
                            >
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="input-priority">Task Priority</Label>
                        <Select
                            onValueChange={(value: "low" | "medium" | "high") => setData('priority', value)}
                            value={data.priority}
                        >
                            <SelectTrigger
                                id="input-priority"
                                className="mt-2 w-full"
                            >
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Low">
                                        Low
                                    </SelectItem>
                                    <SelectItem value="Medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="High">
                                        High
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.priority} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="input-assigned_user_id">Assigned User</Label>
                        <Select
                            onValueChange={(value) => setData('assigned_user_id', value)}
                            value={data.assigned_user_id}
                        >
                            <SelectTrigger
                                id="input-assigned_user_id"
                                className="mt-2 w-full"
                            >
                                <SelectValue placeholder="Select Assigned User" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {users.data.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={String(user.id)}
                                        >
                                            {`${user.name} ( id: ${user.id} )`}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.assigned_user_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="input-due_date">Task Deadline</Label>
                        <Input
                            className="mt-2 block w-full"
                            id="input-due_date"
                            type="date"
                            name="due_date"
                            value={data.due_date}
                            onChange={(e) =>
                                setData('due_date', e.target.value)
                            }
                        />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>

                    <div className="text-right">
                        <Button
                            className="m-3 p-3 font-bold transition-colors duration-300 hover:bg-emerald-200"
                            type="submit"
                        >
                            Update Task
                        </Button>
                        <Button
                            className="m-3 p-3 font-bold transition-colors duration-300 hover:bg-red-300"
                            type="button"
                            onClick={() => router.visit('/task')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default TaskEdit;
