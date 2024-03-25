'use client'

import SubmitBtn from "@/src/components/SubmitBtn"
import forgetPassword from "../forget-pass/forgetPass-server"
import toast from "react-hot-toast"
import resetPass from "./resetPass-server"


export default function ResetPassForm(){
    async function clientAction(formData: FormData){
    const result = await resetPass(formData)
    if(result?.error) toast.error(result.error)
    }
    return(
        <form action={clientAction} className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
              <label
                htmlFor="forgetCode"
                className="text-sm font-semibold text-gray-500"
              >
                Enter your Code
              </label>
              <input
                name="forgetCode"
                type="forgetCode"
                id="forgetCode"
                autoFocus
                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-500"
              >
                New Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                autoFocus
                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="cPassword"
                className="text-sm font-semibold text-gray-500"
              >
                Confirm The New Password
              </label>
              <input
                name="cPassword"
                type="password"
                id="cPassword"
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