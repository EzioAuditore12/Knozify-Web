import { createFileRoute } from '@tanstack/react-router'

//component
import { ValidateOTPForm } from '@/modules/auth/register/components/step2ValidateOTP'

//hook
import { validateOTPHandler } from '@/modules/auth/register/hooks/validateOTPHook'

export const Route = createFileRoute('/_authentication/register/_steps/step2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ValidateOTPForm
        handleSubmit={validateOTPHandler}
  />
}
