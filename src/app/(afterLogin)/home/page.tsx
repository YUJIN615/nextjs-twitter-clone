import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import Tab from './_component/Tab'
import PostForm from './_component/PostForm'
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import style from './home.module.css'

export default async function Page() {
  const queryClient = new QueryClient();
  // 객체 형식으로 받는다.
  // queryKey를 모두 가지고 있는 데이터를 키로 넣었을 때는 queryFn를 실행해서 값을 가져와라.
  await queryClient.prefetchQuery({ queryKey: ['posts', 'recommends'], queryFn: getPostRecommends});
  const dehydratedState = dehydrate(queryClient);

  // 위에서 가져온 데이터를 가져올 때나 수정할 때
  // queryClient.getQueryData(['posts', 'recommends']);
  // queryClient.setQueryData(['posts', 'recommends'], '')

  return (
    <main className={style.main}>
      {/* 서버에서 가져온 데이터를 형식에 맞춰서 가져오기 */}
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
