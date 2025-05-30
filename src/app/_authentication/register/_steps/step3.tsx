import { createFileRoute } from '@tanstack/react-router'

//component
import { UserDetailForm } from '@/modules/auth/register/components/step3UserDetails'

//hook
import { suggestUsernames } from '@/modules/auth/register/hooks/suggestUsernameHook'


export const Route = createFileRoute('/_authentication/register/_steps/step3')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserDetailForm
  handleSubmit={suggestUsernames}
  />
}
