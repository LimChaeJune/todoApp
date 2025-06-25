const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-2xl font-bold">To-Do App</h1>
      {children}
    </div>
  )
}

export default Layout
