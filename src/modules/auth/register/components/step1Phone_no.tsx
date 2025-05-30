import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { sendOTPApiPros} from '../services/sendOTP';
import { registerStateStore } from "../store";

const phoneNumberFormSchema=registerSchema.pick({
  contact:true
})

interface PhoneFormProps{
  handleSubmit:({phone_no}:sendOTPApiPros)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function PhoneNumberForm({handleSubmit}:PhoneFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const {setData}= registerStateStore()

  const registerForm = useAppForm({
    defaultValues: {
      contact: ""
    },
    validators: {
      onChange: phoneNumberFormSchema,
    },
    onSubmit:async({value})=>{
      // TODO:For now made it for indian people , need to change this concept in future
      const response=await handleSubmit({phone_no:value.contact})
      if(response.status){
        setData({ contact: value.contact })
      }
      else{
        setError(response?.message)
      }
    }
  });

  return (
    <div className='p-2 flex flex-col justify-center items-center'>
      <h3 className='mb-5'>Phone Form</h3>
      <form 
      onSubmit={
        (e)=>{
          e.preventDefault()
          registerForm.handleSubmit()
        }
      }
      className='flex flex-col gap-y-4 w-full' 
      >
        <registerForm.AppField
          name="contact"
          children={(field) => (
            <field.PhoneInputField
              className='w-full border-2 border-black p-2 rounded-md'
              defaultCountry="IN"
              placeholder='Phone Number'
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