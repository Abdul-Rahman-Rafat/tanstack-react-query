import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentResponse } from "../Types";
export default function useGetComments(id: string){
    return useQuery({
        queryKey: ["comments", { post_id: +id }],
        queryFn: () => getComments(+id),
    });
}

const getComments = async (id: number): Promise<CommentResponse[]> => {
    const response = await axios.get<CommentResponse[]>(
        `http://localhost:3000/comments?post_id=${+id}`
    );
    return response.data;
}