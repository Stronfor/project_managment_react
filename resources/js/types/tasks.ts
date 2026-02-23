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

export interface ITasks {
    data: {
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
    }[]
    meta: {links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]}
    links: ILinks
}
