"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Cards from "@/components/Cards";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { fetchPosts } from "@/lib/apis";

const InfinitePosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? [];

  return (
    <>
      <Cards posts={posts} />

      <div
        ref={ref}
        className="h-20 col-span-full flex items-center justify-center"
      >
        {isFetchingNextPage && <LoaderCircle className="animate-spin" />}
      </div>
    </>
  );
};
export default InfinitePosts;
