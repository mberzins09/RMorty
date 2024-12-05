import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-100/80 via-teal-100/80 to-blue-100/80 backdrop-blur-sm">
      <nav className="bg-gradient-to-r from-green-100/80 via-teal-100/80 to-blue-100/80 backdrop-blur-sm shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-4xl font-bold text-align-center">Rick & Morty App</h1>
        <div className="space-x-4">
        <Link to="/" className="text-2xl hover:text-blue-500">
          Home
        </Link>{' '}
        <Link to="/favorites" className="text-2xl hover:text-blue-500">
          Favorites
        </Link> 
        </div>
      </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      </div>
      <hr />
      <TanStackRouterDevtools />
    </>
  ),
})
