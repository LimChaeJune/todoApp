import BaseDataTable from '@/components/ui/dataTable/DataTable'
import DataTablePagination from '@/components/ui/dataTable/DataTablePagination'
import useTodoList from '@/app/todo/api/quries/useTodoList'
import DataTableFilter from '@/components/ui/dataTable/DataTableFilter'
import useTodoDataGrid from '../../hooks/useTodoDataGrid'
import { TodoDataTableToolbar } from './TodoDataTableToolbar'

function TodoDataGrid() {
  const { data: todoList } = useTodoList()
  const table = useTodoDataGrid(todoList ?? [])

  return (
    <div className="flex flex-col w-full gap-4">
      <DataTableFilter
        table={table}
        column="text"
        placeholder="Filter todos..."
      />
      <TodoDataTableToolbar table={table} />
      <BaseDataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default TodoDataGrid
