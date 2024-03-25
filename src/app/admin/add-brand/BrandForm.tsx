'use client'

import SubmitBtn from "@/src/components/SubmitBtn"
import createBrand from "./brand-server"
import toast from "react-hot-toast";

export default function BrandForm(){
    async function clientAction(formData: FormData){
        // 'use server'
        const result = await createBrand(formData);
        // console.log(result)
        if(result?.successMsg) toast(result?.successMsg as string);
        if(result?.error) toast.error(result.error)
    }

    return (
        <form action={clientAction} name="createPrduct">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="input input-bordered mb-3  "
            />
         
         
          <label htmlFor="supnail" className="mb-2 block text-left text-lg">
            Brand Image:
          </label>
          <input
            id="supnail"
            type="file"
            placeholder="brand image"
            name="brandImg"
            required
            className="file-input file-input-bordered file-input-secondary mb-3 block w-full max-w-xs"
            />
          
          <SubmitBtn className="block">Create Brand</SubmitBtn>
          
        </form>
    )
}