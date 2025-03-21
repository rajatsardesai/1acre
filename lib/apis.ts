import axios from "axios";

export const fetchPosts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<Post[]> => {
  const res = await axios.get(
    `https://prod-be.1acre.in/lands/?seller=211&page=${pageParam}&page_size=10`,
  );
  return res.data.results;
};
