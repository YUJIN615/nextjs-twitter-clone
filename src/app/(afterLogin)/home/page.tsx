import Tab from './_component/Tab'
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from './_component/PostForm'
import Post from '@/app/(afterLogin)/_component/Post'
import style from './home.module.css'

export default function Page() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}
