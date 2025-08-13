"use client"
import { signIn, signOut, useSession } from "next-auth/react"
export default function NavBar() {
    const session = useSession();
    console.log(session)
    return <div className="flex justify-between">
        <div>Songify</div>
        <div>
            {!session.data?.user && <button className="m-2 p-2 bg-green-400 cursor-pointer" onClick={()=>{
                signIn()
            }}>Login</button>}            
            {session.data?.user && <button className="m-2 p-2 bg-green-400 cursor-pointer" onClick={()=>{
                signOut()
            }}>Logout</button>}
        </div>
    </div>
}