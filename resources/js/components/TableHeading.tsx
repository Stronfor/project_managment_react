import { ChevronsUpDown } from 'lucide-react';

export default function TableHeading({name, sort_field = null, sortable = true, children, sortChanged}:
{ name: string, sort_field?: string | null, sortable?: boolean, children: React.ReactNode, sortChanged: (name: string) => void }) {
    return (
        <th onClick={() => sortChanged(name)}>
            <div className='p-3 cursor-pointer flex items-center justify-between gap-1 px-3 py-3'>
                {children}
                {sortable && <ChevronsUpDown size={16}
                    className={"ml-1 inline-block" + (sort_field === name ?' text-blue-500' : '')}
                />}
            </div>
        </th>
    )
}
