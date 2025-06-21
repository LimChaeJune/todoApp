import Todo from '@/app/todo'
import Layout from '@/components/Layout'
import '@/global.css'
import QueryClientProvider from '@/lib/reactQuery/QueryClientProvider'

function App() {
  return (
    <QueryClientProvider>
      <Layout>
        <Todo />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
