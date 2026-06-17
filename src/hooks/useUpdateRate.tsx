import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  DataItem,
  topRatePost,
  PaginatedResponse,
} from "../Types";

interface MutationContext {
  oldData?: PaginatedResponse;
}

const updateRate = async (
  rate: topRatePost
): Promise<topRatePost> => {
  const result = await axios.patch<topRatePost>(
    `http://localhost:3000/posts/${rate.post_id}`,
    {
      topRate: rate.rateValue,
    }
  );

  return result.data;
};

export default function useUpdateRate() {
  const queryClient = useQueryClient();

  return useMutation<
    topRatePost,
    AxiosError,
    topRatePost,
    MutationContext
  >({
    mutationFn: updateRate,

    onMutate: (values) => {
      const queryKey = [
        "posts",
        {
          filterstatus: "all",
          paginate: values.pageNumber,
        },
      ] as const;

      const oldData =
        queryClient.getQueryData<PaginatedResponse>(
          queryKey
        );

      queryClient.setQueryData<PaginatedResponse>(
        queryKey,
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((post: DataItem) =>
              post.id === values.post_id
                ? {
                    ...post,
                    topRate: values.rateValue,
                  }
                : post
            ),
          };
        }
      );

      return { oldData };
    },

    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        [
          "posts",
          {
            filterstatus: "all",
            paginate: variables.pageNumber,
          },
        ],
        context?.oldData
      );
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "posts",
          {
            filterstatus: "all",
            paginate: variables.pageNumber,
          },
        ],
      });
    },
  });
}