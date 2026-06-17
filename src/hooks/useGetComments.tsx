import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentResponse } from "../Types";


const getComments = async (id: number,signal:AbortSignal): Promise<CommentResponse[]> => {


    const response = await axios.get<CommentResponse[]>(
        `http://localhost:3000/comments?post_id=${+id}` , {signal}
    );
    
    return response.data;
}

export default function useGetComments(id: string){
    return useQuery({
        queryKey: ["comments", { post_id: +id }],
        queryFn: ({signal}) => getComments(+id,signal),
    });
}