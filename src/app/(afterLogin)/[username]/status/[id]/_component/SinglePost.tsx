"use client"

import {useQuery} from "@tanstack/react-query";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

type Props = {
  id: string;
}

export default function SinglePost({ id }: Props) {
  const { data: post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })
  if (error) {
    return (
      <div style={{ fontSize: 31, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0'}}>게시글을 찾을 수 없습니다.</div>
    )
  }
  if (!post) {
    return null;
  }
  if (post) {
    return <Post key={post.postId} post={post} />
  }
}
