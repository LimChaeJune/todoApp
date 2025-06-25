import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface DataTableFilterProps<TData> {
  table: Table<TData>
  placeholder?: string
  column: string
  className?: string
}

const DataTableFilter = <TData extends object>({
  table,
  placeholder = 'Filter by...',
  column,
  className,
}: DataTableFilterProps<TData>) => {
  return (
    <div className={cn('flex items-center py-4', className)}>
      <Input
        placeholder={placeholder}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(column)?.setFilterValue(event.target.value)
        }
        className={className}
      />
    </div>
  )
}

export default DataTableFilter
