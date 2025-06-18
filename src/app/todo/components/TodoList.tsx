import { DataTable } from '@/components/ui/DataTable'
import { todoListColumns } from '@/app/todo/const/columns'
import useTodoList from '@/app/todo/api/quries/useTodoList'
import TodoFilters from '@/app/todo/components/TodoFilters'

export default function TodoList() {
  const { data: todoList } = useTodoList()

  return (
    <div className="flex flex-col w-full gap-4">
      <TodoFilters />
      <DataTable columns={todoListColumns} data={todoList ?? []} />
    </div>
  )
}
