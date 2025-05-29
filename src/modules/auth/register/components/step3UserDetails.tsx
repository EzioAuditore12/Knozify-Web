import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { suggestUsernameProps } from '../services/suggestUsername';
import { registerStateStore } from "../store";

const userDetailsFormSchema=registerSchema.pick({
  first_name:true,
  last_name:true,
  birth_date:true
})

interface UserDetailsFormProps{
  handleSubmit:({first_name,last_name,birth_date}:suggestUsernameProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function UserDetailForm({handleSubmit}:UserDetailsFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const {setData}= registerStateStore()

  const registerForm = useAppForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date:""
    },
    validators: {
      onChange: userDetailsFormSchema,
    },
    onSubmit:async({value})=>{
     
      const response=await handleSubmit({
        first_name:value.first_name,
        last_name:value.last_name,
        birth_date:value.birth_date
      })
      if(response.status){
        setData(value)
      }
      else{
        setError(response?.message)
      }
    }
  });

  return (
    <div className='p-2 flex flex-col justify-center items-center'>
      <h3 className='mb-5'>User Details Form</h3>
      <form 
      onSubmit={
        (e)=>{
          e.preventDefault()
          registerForm.handleSubmit()
        }
      }
      className='flex flex-col gap-y-4 w-full px-5' 
      >
        <registerForm.AppField
          name="first_name"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='First Name'
            />
          )}
        />

         <registerForm.AppField
          name="last_name"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='Last Name'
            />
          )}
        />

        <registerForm.AppField
          name="birth_date"
          children={(field)=>(
            <field.DateField
            className='w-full'
            placeholder='Pick your date of birth'
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