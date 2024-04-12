import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import style from './singlePost.module.css'

export default function SinglePost() {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      {/* 원본 게시글 */}
      <Post />

      {/* 답글 달기 */}
      <CommentForm />

      {/* 답글 목록 */}
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
