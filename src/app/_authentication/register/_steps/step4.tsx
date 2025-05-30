import { createFileRoute } from '@tanstack/react-router'

//component
import { UserNameForm } from '@/modules/auth/register/components/step4UsernameForm'


//hook
import { checkUsernameHook } from '@/modules/auth/register/hooks/checkUsernameHook'

export const Route = createFileRoute('/_authentication/register/_steps/step4')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserNameForm
    handleSubmit={checkUsernameHook}
  />
}
