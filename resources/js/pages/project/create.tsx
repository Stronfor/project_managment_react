import { Head, useForm, router } from '@inertiajs/react';
import { useRef, useEffect } from "react";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

import { Input  } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Project',
        href: 'project.create',
    },
];

const ProjectCreate = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, errors } = useForm({
        image: null as File | null,
        name: '',
        status: 'pending',
        description: '',
        due_date: ''
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/project');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={onSubmitHandle}
                    className="p-10 sm:rounded-lg sm:p-8 m-5 bg-sidebar"
                >
                    <div className='mb-4'>
                        <Label htmlFor="input-img">Project Image</Label>
                        <Input className='mt-2 w-full block'
                            id="input-img"
                            type="file"
                            name='image'
                            onChange={e => e.target.files && setData('image', e.target.files[0])}
                        />
                        <InputError message={errors.image} className='mt-2' />
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor="input-name">Project Name</Label>
                        <Input className='mt-2 w-full block'
                            id="input-name"
                            type="text"
                            name='name'
                            value={data.name}
                            ref={inputRef}
                            onChange={e => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className='mt-2' />
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor="input-description">Project Description</Label>
                        <Textarea className='mt-2 w-full block'
                            id="input-description"
                            name='description'
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className='mt-2' />
                    </div>

                    <div className='mb-4'>
                        <Label htmlFor="input-status">Project Status</Label>
                        <Select onValueChange={value => setData('status', value)} value={data.status}>
                            <SelectTrigger id='input-status' className="w-full mt-2">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className='mt-2' />
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor="input-due_date">Project Deadline</Label>
                        <Input className='mt-2 w-full block'
                            id="input-due_date"
                            type="date"
                            name='due_date'
                            value={data.due_date}
                            onChange={e => setData('due_date', e.target.value)}
                        />
                        <InputError message={errors.due_date} className='mt-2' />
                    </div>

                    <div className='text-right'>
                        <Button className='m-3 p-3 font-bold hover:bg-emerald-200 transition-colors duration-300' type="submit">
                            Create Project
                        </Button>
                        <Button
                            className='m-3 p-3 font-bold hover:bg-red-300 transition-colors duration-300'
                            type="button"
                            onClick={() => router.visit('/project')}
                        >
                            Cancel
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
};

export default ProjectCreate;
