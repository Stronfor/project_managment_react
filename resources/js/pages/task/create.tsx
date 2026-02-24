import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
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
import type { BreadcrumbItem, User, IProject } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Task',
        href: 'task.create',
    },
];

const TaskCreate = () => {
    const { users } = usePage<{ users: {data: User[]} }>().props;
    const { projects } = usePage<{ projects: {data: IProject[]} }>().props;

    const inputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, errors } = useForm({
        image: null as File | null,
        name: '',
        status: 'pending',
        priority: 'Low',
        assigned_user_id: '',
        project_id: '',
        description: '',
        due_date: '',
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/task');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={onSubmitHandle}
                    className="m-5 bg-sidebar p-10 sm:rounded-lg sm:p-8"
                >
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
                            onChange={(e) =>setData('image', e.target.files ? e.target.files[0] : null)}
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
                            ref={inputRef}
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
                            onValueChange={(value) => setData('status', value)}
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
                            onValueChange={(value) => setData('priority', value)}
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
                            Create Task
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

export default TaskCreate;
