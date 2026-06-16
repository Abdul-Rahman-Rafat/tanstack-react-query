import axios from "axios";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { DataItem } from "../Types";

interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: DataItem[];
}

const getPost = async (id: string): Promise<DataItem> => {
  const response = await axios.get<DataItem>(
    `http://localhost:3000/posts/${id}`
  );

  return response.data;
};

export const useGetPost = (
  id: string,
  paramType: string,
  paramKey: string
): UseQueryResult<DataItem> => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["post", { id: +id }],

    queryFn: () => getPost(id),

    initialData: () => {
      console.log(
  "ALL QUERIES",
  queryClient.getQueryCache().getAll().map(
    (q) => q.queryKey
  ))
      if (paramType === "paginate") {
        const cachedPage =
          queryClient.getQueryData<PaginatedResponse>([
            "posts",
            {
              filterstatus: "all",
              paginate: +paramKey,
            },
          ]);

        const post = cachedPage?.data.find(
          (item) => +item.id === +id
        );

        if (post) {
          console.log("Cache Hit (Paginate)", post);
        }

        return post;
      }

      const cachedSearch =
        queryClient.getQueryData<DataItem[]>([
          "posts",
          { q: paramKey },
        ]);

      const post = cachedSearch?.find(
        (item) => item.id === +id
      );

      if (post) {
        console.log("Cache Hit (Search)", post);
      }

      return post;
    },

    staleTime: 1000 * 60,
  });
};