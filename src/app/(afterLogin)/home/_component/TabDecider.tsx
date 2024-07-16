'use client';

import {use} from "react";
import {TabContext} from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";

export default function TabDecider() {
  const { tab } = use(TabContext); // use 훅이 추가됨. if 문 안에서도 사용 가능
  if (tab === 'rec') {
    return <PostRecommends />
  }
  return <FollowingPosts />
}
