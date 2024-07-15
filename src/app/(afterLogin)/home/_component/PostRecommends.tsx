"use client"

import {Fragment, useEffect} from "react";
import {InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post"

export default function PostRecommends() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching// 데이터 가져오고 있는지 여부
  } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: String, _2: String], number>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })
  const { ref, inView} = useInView({
    threshold: 0, // target 몇 픽셀 보였을 때 호출할 것인지
    // delay: 1000, // target 보이고 몇 초 후에 호출할 것인지
  });

  useEffect(() => {
    // target이 화면에 보이면 inView가 true가 되어서 hook이 실행된다.
    if (inView) {
      // 데이터 가져오는 중이 아닐때 && 다음 페이지가 있을 때 함수 실행
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => <Post key={post.postId} post={post} />)}
        </Fragment>))}
      <div ref={ref} style={{height: 50}} />
    </>
  )
}
