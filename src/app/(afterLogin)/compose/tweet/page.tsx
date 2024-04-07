import Home from '@/app/(afterLogin)/home/page'
import TweetModal from "@/app/(afterLogin)/@modal/(.)compose/tweet/page";

export default function Page() {
  return (
    <>
      경로로 들어왔을때, 새로고침 했을 때
      <Home />
      <TweetModal />
    </>
  )
}
