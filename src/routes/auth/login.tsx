import { Login } from '@/components/auth/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center align-middle items-center">
      <Login />
    </div>
  )
}
