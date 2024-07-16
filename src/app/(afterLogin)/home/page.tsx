import {Suspense} from "react";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import Tab from './_component/Tab'
import PostForm from './_component/PostForm'
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";
import style from './home.module.css'

export default async function Page() {


  return (
    <main className={style.main}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Suspense fallback={<Loading />} >
            <TabDeciderSuspense />
          </Suspense>
        </TabProvider>
    </main>
  );
}
