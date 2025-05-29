import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { type validateOTPProps } from '../services/validateOTP';
import { registerStateStore } from '../store';
const validateOTPFormSchema=registerSchema.pick({
  otp:true
})

interface ValidateOTPProps{
  handleSubmit:({phone_no,otp}:validateOTPProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function ValidateOTPForm({handleSubmit}:ValidateOTPProps) {

  const [error,setError]=useState<string | undefined>("")

   const phoneNumber=registerStateStore((state)=>state.contact)

  const registerForm = useAppForm({
    defaultValues: {
      otp:""
    },
    validators: {
      onChange: validateOTPFormSchema,
    },
    onSubmit:async({value})=>{
      // TODO:For now made it for indian people , need to change this concept in future
      console.log({
        ...value,
        phoneNumber
      })

  
      const response=await handleSubmit({phone_no:phoneNumber ?? '', otp:value.otp})
      if(!response.status){
        setError(response?.message)
      }
    }
  });

  return (
    <div className='p-2 flex flex-col justify-center items-center'>
      <h3 className='mb-5'>OTP Form</h3>
      <form 
      onSubmit={
        (e)=>{
          e.preventDefault()
          registerForm.handleSubmit()
        }
      }
      className='flex flex-col gap-y-4 w-full px-5 max-w-[400px]' 
      >
        <registerForm.AppField
          name="otp"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='OTP'
            />
          )}
        />
        <registerForm.AppForm>
          <registerForm.SubmitButton
          title={"Next"}
          className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
        </registerForm.AppForm>
      </form>
      {error && <Text intent={"destructive"}>{error}</Text>}
    </div>
  );
}