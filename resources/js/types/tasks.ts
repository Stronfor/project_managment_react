import type { IProject } from "./project";

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

export interface ITask {
    id: number
    name: string
    description: string
    created_at: string
    due_date: string
    status: "completed" | "in_progress" | "pending"
    project: IProject
    image_path: string
    createdBy: IUserBy
    updatedBy: IUserBy
    priority: "low" | "medium" | "high"
    assignedUser: IUserBy | null
}

export interface ITasks {
    data: ITask[]
    meta: {links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]}
    links: ILinks
}
