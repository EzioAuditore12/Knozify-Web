import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/register/_steps/step5')({
  component: RouteComponent,
})

import { UserCredentialForm } from '@/modules/auth/register/components/step5UserCredentials'
import { finalizeRegisteration } from '@/modules/auth/register/hooks/finalizeRegister'

function RouteComponent() {
  return <UserCredentialForm
  handleSubmit={finalizeRegisteration}
  />
}
