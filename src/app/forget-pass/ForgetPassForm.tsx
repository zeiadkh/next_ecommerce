'use client'

import SubmitBtn from "@/src/components/SubmitBtn"
import forgetPassword from "./forgetPass-server"
import toast from "react-hot-toast"

export default function ForgetPassForm(){
    async function clientAction(formData:FormData){
        const result = await forgetPassword(formData)
        if(result?.error) toast.error(result.error)
    }
    return (
        <form action={clientAction} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-500"
          >
            Email address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            autoFocus
            className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <div>
          <SubmitBtn className="mx-auto block w-[80%]">Sumbit</SubmitBtn>
        </div>
      </form>
    )
}