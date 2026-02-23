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

export interface IProject {
    id: number
    name: string
    description: string
    created_at: string
    due_date: string
    status: "completed" | "in_progress" | "pending"
    image_path: string
    createdBy: IUserBy
    updatedBy: IUserBy
}

export interface IProjects {
    data:IProject[]
    meta: {links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]}
    links: ILinks
}
