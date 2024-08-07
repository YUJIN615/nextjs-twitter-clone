import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {HydrationBoundary, dehydrate, QueryClient} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  // 객체 형식으로 받는다.
  // queryKey를 모두 가지고 있는 데이터를 키로 넣었을 때는 queryFn를 실행해서 값을 가져와라.
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0 // prefetchInfiniteQuery 일때 필수값
  });
  const dehydratedState = dehydrate(queryClient);

  // 위에서 가져온 데이터를 가져올 때나 수정할 때
  // queryClient.getQueryData(['posts', 'recommends']);
  // queryClient.setQueryData(['posts', 'recommends'], '')

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  )
}
