import TodoDataGrid from '@/app/todo/components/todoDataGrid'
import TodoForm from '@/app/todo/components/todoForm'

const Todo = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <TodoForm />
      <TodoDataGrid />
    </div>
  )
}

export default Todo
