import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import style from './photoModal.module.css';
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {ImageZone} from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";

type Props = {
  params: { id: string }
}

export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts', id], queryFn: getUser});
  await queryClient.prefetchQuery({ queryKey: ['posts', id, 'comments'], queryFn: getUserPosts});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
