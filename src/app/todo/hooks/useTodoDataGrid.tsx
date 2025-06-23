import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Todo } from '@/app/todo/types'
import { columns } from '@/app/todo/constants/table'
import useLocalStorage from '@/hooks/useLocalStorage'

const useTodoDataGrid = (todoList: Todo[]) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>(
    'todo_filters',
    []
  )

  const table = useReactTable({
    data: todoList ?? [],
    columns: columns,
    state: {
      rowSelection,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
  })

  return table
}

export default useTodoDataGrid
