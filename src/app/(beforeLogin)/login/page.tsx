'use client'
import {useEffect} from "react";
import {redirect, useRouter} from 'next/navigation'
import {useSession} from "next-auth/react";
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Page() {
  const router = useRouter();
  const {data:session} = useSession();
  useEffect(() => {
    router.replace('/i/flow/login')
  }, [])

  if(session?.user) {
    redirect('/home');
    return null;
  }
  return (
    <Main />
  )
}
