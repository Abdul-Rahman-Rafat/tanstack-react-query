import { useState } from "react";


import { useGetPost } from "../hooks/useGetPost";
import { useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";
import { CommentResponse, CommentPost } from "../Types";
const Info = () => {
  const [comment,setComment]=useState<string>("")



  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as string;
  const paramKey = searchParams.get("key") as string;
  console.log("id : " , id, "paramType : ",paramType,"paramKey : ", paramKey);
  
  const addComment = useAddComment();
  const {data: comments, isLoading: commentsLoading, error: commentsError} = useGetComments(id);
  const {data , isLoading , error} = useGetPost(id,paramType,paramKey);
  console.log(data);

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error Occured</div>
  if(!data) return <div>No Data Found</div>
  

  function commentSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    addComment.mutate({post_id: +id , comment: comment},{onSuccess:()=>{
      setComment("");
    },onError:()=>{
      console.log("Error adding comment");
    } });
    
  }
  return (
    <div>
      <h4>Title: {data?.title}</h4>
      <p>Status:{data?.status}</p>
      <p>Top Rate:{data?.topRate ? "good":"bad"}</p>
      <p>Body:{data?.body}</p>
      <hr />
      <h4 className="mb-2">Comments:</h4>
      <form onSubmit={commentSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" value={comment}  onChange={(e) => setComment(e.target.value)} />
        </Form.Group>
        <Button type="submit" disabled={addComment.isPending}>Add Comment</Button>
      </form>
      {commentsLoading && <div>Loading...</div>}
      {commentsError && <div>Error Occured</div>}
      {comments && !commentsLoading && !commentsError && <div>
        {comments.map((comment: CommentResponse) => (
          <p key={comment.id}>{comment.comment}</p>
        ))}
      </div>}
    </div>
  );
}

export default Info;
