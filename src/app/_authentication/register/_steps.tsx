import { createFileRoute} from '@tanstack/react-router'
import FormLayout from '@/modules/auth/register/layout/form-layout'

//TODO: Need to improve the registeration UI
//TODO: Need to add more secured routes for the steps in registeration form
export const Route = createFileRoute('/_authentication/register/_steps')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div
  className='flex justify-center items-center h-screen bg-[#e3e3e3] p-3
             md:py-16'
  >
    <FormLayout/>
  </div>
}
