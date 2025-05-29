import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const Route = createFileRoute('/_app/search/')({
  component: RouteComponent,
})

function RouteComponent() {
    const [value, setValue] = useState<string | undefined>(undefined)
    console.log(`Value is ${value} with type ${typeof value}`)
  return <div
  className='flex h-full w-full justify-center items-center '
  >
    <PhoneInput
      defaultCountry="IN"
      countries={["IN"]}
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
  </div>
}
