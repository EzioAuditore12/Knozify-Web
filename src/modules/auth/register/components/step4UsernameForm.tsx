import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { type checkUsernameProps } from '../services/checkUsername';
import { registerStateStore } from "../store";

const UserNameFormSchema=registerSchema.pick({
  username:true,
})

interface UserCredentialsFormProps{
  handleSubmit:({username}:checkUsernameProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function UserNameForm({handleSubmit}:UserCredentialsFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const {setData}= registerStateStore()

  const registerForm = useAppForm({
    defaultValues: {
      username:"",
    },
    validators: {
      onChange: UserNameFormSchema,
    },
    onSubmit:async({value})=>{
      // TODO:For now made it for indian people , need to change this concept in future
      const response=await handleSubmit({
        username:value.username
      })
      if(response.status){
        setData({
          username:value.username,
        })
      }
      else{
        setError(response?.message)
      }
    }
  });

  return (
<div className='p-2 flex flex-col justify-center items-center'>
      <h3 className='mb-5'>Username</h3>
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
          name="username"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='User Name'
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