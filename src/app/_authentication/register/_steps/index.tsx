import { createFileRoute} from '@tanstack/react-router'

//component
import { PhoneNumberForm } from '@/modules/auth/register/components/step1Phone_no'

//hook
import { useRegisterFormHook } from '@/modules/auth/register/hooks'


export const Route = createFileRoute('/_authentication/register/_steps/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {sendOTP}=useRegisterFormHook()
  return <PhoneNumberForm
          handleSubmit={sendOTP}
  />
}
