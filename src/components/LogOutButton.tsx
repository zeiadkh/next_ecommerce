import SubmitBtn from "./SubmitBtn"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export default function LogOutButton(){
    async function clientAction(){
        'use server'
        cookies().set('token', '', {expires: new Date(0)})
        redirect('/')
    }
    return (
        <form action={clientAction}>
            <SubmitBtn className="btn-warning">LogOut</SubmitBtn>
        </form>
        
    )
}