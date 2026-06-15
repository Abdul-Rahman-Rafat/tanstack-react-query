import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { DataItem, postStatusType } from "../Types";

interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: DataItem[];
}

const getposts = async (
  filterstatus: postStatusType,
  paginate: number,
): Promise<PaginatedResponse> => {
  if (filterstatus === "all") {
    const response = await axios.get<PaginatedResponse>(
      `http://localhost:3000/posts?_page=${paginate}&_per_page=5`,
    );
    console.log(response.data.data);
    return response.data;
  } else {
    const response = await axios.get<PaginatedResponse>(
      `http://localhost:3000/posts?status=${filterstatus}`,
    );
    console.log(response.data);
    return response.data;
  }
};

const useGetPosts = (
  filterstatus: postStatusType,
  paginate: number,
): UseQueryResult<PaginatedResponse> => {
  //useQuery is a hook provided by react-query to fetch data and manage the state of the request.
  //  It takes an object as an argument with two properties: queryKey and queryFn.
  //  queryKey is a unique identifier for the query,
  //  and queryFn is a function that returns a promise which resolves to the data we want to fetch.
  const query = useQuery({
    queryKey: ["posts", { filterstatus, paginate }],
    queryFn: () => getposts(filterstatus, paginate),
    staleTime: 1000 * 5,
  });
  return query;
};

export default useGetPosts;
