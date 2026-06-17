import { useMutation , UseMutationResult } from "@tanstack/react-query";
import axios,{AxiosError} from "axios";

interface CommentPost{
    post_id: number;
    comment: string;
}
interface CommentResponse{
    id: number;
    comment: string;
    post_id: number;
}

const requestData =async (data: CommentPost): Promise<CommentResponse> => {
    const result = await axios.post<CommentResponse>(
        `http://localhost:3000/comments`,
        data
    );
    return result.data;
   }

export default  function useAddComment(){
    
    return useMutation<CommentResponse, AxiosError, CommentPost>({
        mutationFn: requestData,
        onSuccess: (data) => {
            console.log("Comment added successfully", data);
        },
        onError: (error) => {
            console.log("Error adding comment", error);
        },
    });

 }