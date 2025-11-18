import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated)/dashboard/profile"!</div>
}
