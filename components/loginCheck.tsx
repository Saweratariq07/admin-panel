"use Client"
import { useRouter } from 'next/navigation';


export const LoginCheck = () => {
  const { push } = useRouter();
    const t: any = localStorage.getItem("token")
    const token = JSON.parse(t)
    if(!token){
        push("/signin")
        return
    }
    if(token?.expiresIn < Date.now()) {
        push("/signin")
        return
    }


    return <></>
}