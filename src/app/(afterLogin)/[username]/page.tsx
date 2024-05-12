import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import style from './profile.module.css';
import {UserInfo} from "@/app/(afterLogin)/[username]/_component/UserInfo";

type Props = {
  params: { username: string }
}

// 서버사이드 렌더링 > 기준은 검색 페이지에 노출되어야 하는 페이지
export default async function Profile({ params }: Props) {
  const queryClient = new QueryClient();
  const { username } = params;

  await queryClient.prefetchQuery({ queryKey: ['users', username], queryFn: getUser});
  await queryClient.prefetchQuery({ queryKey: ['posts', 'users', username], queryFn: getUserPosts});

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}
