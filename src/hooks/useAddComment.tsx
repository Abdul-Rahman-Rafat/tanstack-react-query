import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  import axios, { AxiosError } from "axios";
  
  interface CommentPost {
    post_id: number;
    comment: string;
  }
  
  interface CommentResponse {
    id: number;
    comment: string;
    post_id: number;
  }
  
  const requestData = async (
    data: CommentPost
  ): Promise<CommentResponse> => {
    const result = await axios.post<CommentResponse>(
      "http://localhost:3000/comments",
      data
    );
  
    return result.data;
  };
  
  export default function useAddComment() {
    const queryClient = useQueryClient();
  
    return useMutation<
      CommentResponse,
      AxiosError,
      CommentPost,
      { previousComments?: CommentResponse[] }
    >({
      mutationFn: requestData,
  
      // Optimistic Update
      onMutate: async (newComment) => {
        await queryClient.cancelQueries({
          queryKey: [
            "comments",
            { post_id: newComment.post_id },
          ],
        });
  
        const previousComments =
          queryClient.getQueryData<CommentResponse[]>([
            "comments",
            { post_id: newComment.post_id },
          ]);
  
        queryClient.setQueryData<CommentResponse[]>(
          ["comments", { post_id: newComment.post_id }],
          (old = []) => [
            ...old,
            {
              id: Date.now(), // temporary id
              comment: newComment.comment,
              post_id: newComment.post_id,
            },
          ]
        );
  
        return { previousComments };
      },
  
      // Rollback
      onError: (_error, variables, context) => {
        queryClient.setQueryData(
          ["comments", { post_id: variables.post_id }],
          context?.previousComments
        );
      },
  
      // Sync with server
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: [
            "comments",
            { post_id: variables.post_id },
          ],
        });
      },
    });
  }