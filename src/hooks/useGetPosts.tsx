import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { DataItem, postStatusType } from "../Types";

const getposts = async (filterstatus: postStatusType): Promise<DataItem[]> => {
  if (filterstatus === "all") {
    const response = await axios.get<DataItem[]>("http://localhost:3000/posts");
    return response.data;
  } else {
    const response = await axios.get<DataItem[]>(
      `http://localhost:3000/posts?status=${filterstatus}`,
    );
    return response.data;
  }
  // console.log(response.data);
};

const useGetPosts = (
  filterstatus: postStatusType,
): UseQueryResult<DataItem[]> => {
  //useQuery is a hook provided by react-query to fetch data and manage the state of the request.
  //  It takes an object as an argument with two properties: queryKey and queryFn.
  //  queryKey is a unique identifier for the query,
  //  and queryFn is a function that returns a promise which resolves to the data we want to fetch.
  const query = useQuery({
    queryKey: ["posts", { filterstatus }],
    queryFn: () => getposts(filterstatus),
    staleTime: 1000 * 5,
  });
  return query;
};

export default useGetPosts;
