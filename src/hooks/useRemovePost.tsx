import axios from "axios";
import { useMutation,useQueryClient } from "@tanstack/react-query";

const deletePost = async (id:number)=>{
    const deleteRequest = await axios.delete(`http://localhost:3000/posts/${id}`);
    return deleteRequest.data;
};

export default function useRemovePost(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePost,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["posts"],
                exact:false
            })
        }
    })
}