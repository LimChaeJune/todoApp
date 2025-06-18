import TodoInput from '@/app/todo/components/TodoInput'
import TodoList from '@/app/todo/components/TodoList'

const Todo = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default Todo
