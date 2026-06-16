import { useGetPost } from "../hooks/useGetPost";
import { useSearchParams } from "react-router-dom";
const Info = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as string;
  const paramKey = searchParams.get("key") as string;
  console.log("id : " , id, "paramType : ",paramType,"paramKey : ", paramKey);

  const {data , isLoading , error} = useGetPost(id,paramType,paramKey);
  console.log(data);

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error Occured</div>
  if(!data) return <div>No Data Found</div>

  return (
    <div>
      <h4>Title: {data?.title}</h4>
      <p>Status:{data?.status}</p>
      <p>Top Rate:{data?.topRate ? "good":"bad"}</p>
      <p>Body:{data?.body}</p>
      <hr />
      <h4 className="mb-2">Comments:</h4>
      <p>Comment 1</p>
      <p>Comment 2</p>
    </div>
  );
};

export default Info;
