"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Cards from "@/components/posts/Cards";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { fetchPosts } from "@/lib/apis";

const InfinitePosts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1, // Defines next page param
  });

  // Intersection Observer hook to detect when the user scrolls to the loader div
  const { ref, inView } = useInView();

  // Automatically fetch next page when the loader comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten paginated data into a single array of posts
  const posts = data?.pages.flatMap((page) => page) ?? [];

  // Show loading state while fetching initial data
  if (isLoading) {
    return (
      <div className="h-100 flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // Show error message if API fails
  if (isError) {
    return (
      <div className="h-40 flex items-center justify-center text-red-500">
        Failed to load posts. Please try again later.
      </div>
    );
  }

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
