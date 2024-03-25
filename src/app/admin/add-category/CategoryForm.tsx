'use client'

import toast from "react-hot-toast";
import createCategory from "./category-server";
import SubmitBtn from "@/src/components/SubmitBtn";

export default function CategoryForm(){
    async function clientAction(formData: FormData) {
        const result = await createCategory(formData);
        // console.log(result);
        if(result?.successMsg) toast(result.successMsg as string);
        if (result?.error) toast.error(result.error);
      }
  
  return(
    <form action={clientAction} name="createPrduct">
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          className="input input-bordered mb-3  "
          />
       
       
        <label htmlFor="supnail" className="mb-2 block text-left text-lg">
          Category Image:
        </label>
        <input
          id="supnail"
          type="file"
          placeholder="default image"
          name="catImg"
          required
          className=" file-input file-input-bordered file-input-secondary mb-3 block w-full max-w-xs"
          />
        
        <SubmitBtn className="block">Create Category</SubmitBtn>
        
      </form>
  )
      
}