import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { type registerAPIProps } from '../services/finalRegister';
import { registerStateStore } from "../store";

const UserCredentialFormSchema=registerSchema.pick({
  username:true,
  password:true
})

interface UserCredentialsFormProps{
  handleSubmit:({username,password,first_name,last_name,contact}:registerAPIProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function UserCredentialForm({handleSubmit}:UserCredentialsFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const userName=registerStateStore((state)=>state.username)
  const phoneNumber=registerStateStore((state)=>state.contact)
  const firstName=registerStateStore((state)=>state.first_name)
  const lastName=registerStateStore((state)=>state.last_name)

  const registerForm = useAppForm({
    defaultValues: {
      password:"",
    },
    validators: {
      onChange: UserCredentialFormSchema,
    },
    onSubmit:async({value})=>{
      console.log(userName,phoneNumber,firstName,lastName,phoneNumber)
      const response=await handleSubmit({
        username:userName ?? "",
        contact:phoneNumber ?? "",
        first_name:firstName ?? "",
        last_name:lastName ?? "",
        password:value.password
      })
      if(!response.status){
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
          name="password"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='Password'
              type="password"
            />
          )}
        />
        <registerForm.AppForm>
          <registerForm.SubmitButton
          title={"Register"}
          className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
        </registerForm.AppForm>
      </form>
      {error && <Text intent={"destructive"}>{error}</Text>}
    </div>
  );
}