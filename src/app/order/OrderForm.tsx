'use client'

import toast from "react-hot-toast";
import  order  from "./order-server";
import SubmitBtn from "@/src/components/SubmitBtn";
import { useEffect, useState } from "react";
import VisaPage from "./visa-checkout/page";
import { url } from "inspector";
import Link from "next/link";

export default function OrderForm(){
  const [result, setResult] = useState('')
    async function ClientAction(formData: FormData){
        const result = await order(formData);
        setResult(result.url)
        if(result?.error) toast.error(result.error);
    }
    return (
        <form action={ClientAction} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-gray-500"
          >
            Your Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            id="phone"
            required
            autoFocus
            className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="coupon"
            className="text-sm font-semibold text-gray-500"
          >
            Enter Your Coupon
          </label>
          <input
            name="coupon"
            type="text"
            id="coupon"
            autoFocus
            className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="address"
            className="text-sm font-semibold text-gray-500"
          >
            Enter your Address
          </label>
          <input
            name="address"
            type="text"
            id="address"
            autoFocus
            required
            className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <select
          title="Payment-method"
          name="payment"
          defaultValue={"cash"}
          className="select select-secondary w-full max-w-xs"
        >
          {/* <option disabled selected hidden>
            Pick your Payment Method
          </option> */}
          <option defaultChecked value={"cash"}>
            Cash
          </option>
          <option value={"visa"}>Visa</option>
        </select>

        <div>
          <SubmitBtn className="mx-auto block w-[80%]">Sumbit</SubmitBtn>
        </div>
        {result && <Link className="btn btn-success w-fit mx-auto" href={result} target="_blank">Payment process</Link>}
        {/* <VisaPage url={result} /> */}

      </form>
    )
}