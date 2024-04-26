// next-auth 가 만들어둔 middleware 를 이름만 바꿔서 쓰기
import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/i/flow/login')
  }
}

// middleware 를 적용할 route > 로그인을 해야 접근할 수 있는 페이지들
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search']
}
