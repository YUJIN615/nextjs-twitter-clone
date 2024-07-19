import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import("@/app/(beforeLogin)/_component/LoginModal"))

export default function Page() {
  return (
    <LoginModal />
  )
}
