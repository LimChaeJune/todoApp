import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { todoListColumns } from '../constants/table'
import { useState } from 'react'
import { Todo } from '../types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const useTodoDataGrid = (todoList: Todo[]) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>(
    'todo_filters',
    []
  )

  const table = useReactTable({
    data: todoList ?? [],
    columns: todoListColumns,
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
