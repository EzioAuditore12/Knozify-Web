import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/reels/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/reels/"!</div>
}
