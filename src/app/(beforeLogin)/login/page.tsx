import {redirect} from "next/navigation";

// login 으로 진입시 i/flow/login 으로 리다이렉트
export default function Login() {
  redirect('/i/flow/login');
}
