import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface MyPaginationProps {
    links: {
        active: boolean
        label: string
        page: number | null
        url: string | null
    }[]
}

export function MyPagination({links}: MyPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={links[0]?.url || ''} />
        </PaginationItem>

        {links.map(link => (
            <PaginationItem key={link.label}>
                {link.label.includes('Previous') || link.label.includes('Next') ? null
                :   <PaginationLink
                        href={link.url || ''}
                        isActive={link.active}
                        dangerouslySetInnerHTML={{__html: link.label}}
                    >
                    </PaginationLink>}
            </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={links[links.length - 1]?.url || ''} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
